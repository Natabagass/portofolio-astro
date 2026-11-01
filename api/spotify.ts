import { Redis } from '@upstash/redis';
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const REFRESH_TOKEN_KEY = 'portfolio:spotify:refresh-token';

const describeError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return `status=${error.response?.status ?? 'network-error'} code=${error.code ?? 'unknown'}`;
    }

    return error instanceof Error ? error.message : 'Unknown error';
};

const initialRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN?.trim();
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

let inMemoryRefreshToken: string | undefined;

interface SpotifyTokenResponse {
    access_token: string;
    refresh_token?: string;
}

interface SpotifyData {
    currently_playing_type: string;
    item: {
        name: string;
        album: {
            name: string;
            artists: Array<{ name: string }>;
            images: Array<{ url: string }>;
        };
        external_urls: {
            spotify: string;
        };
    } | null;
}

type CurrentlyPlayingTrack = Omit<SpotifyData, 'item'> & {
    item: NonNullable<SpotifyData['item']>;
};

const getRefreshToken = async (): Promise<string | null> => {
    if (inMemoryRefreshToken) return inMemoryRefreshToken;

    if (redis) {
        try {
            const savedToken = await redis.get<string>(REFRESH_TOKEN_KEY);
            if (savedToken) {
                inMemoryRefreshToken = savedToken;
                return savedToken;
            }

            if (initialRefreshToken) {
                await redis.set(REFRESH_TOKEN_KEY, initialRefreshToken, { nx: true });
                const seededToken = await redis.get<string>(REFRESH_TOKEN_KEY);
                inMemoryRefreshToken = seededToken ?? initialRefreshToken;
                return inMemoryRefreshToken;
            }
        } catch (error) {
            console.error('Could not read the Spotify refresh token from Redis:', describeError(error));
        }
    }

    inMemoryRefreshToken = initialRefreshToken;
    return inMemoryRefreshToken ?? null;
};

const saveRefreshToken = async (refreshToken: string): Promise<void> => {
    inMemoryRefreshToken = refreshToken;

    if (!redis) {
        console.warn('Spotify returned a new refresh token, but Upstash Redis is not configured to persist it.');
        return;
    }

    try {
        await redis.set(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
        console.error('Could not persist the updated Spotify refresh token to Redis:', describeError(error));
    }
};

const requestAccessToken = async (refreshToken: string): Promise<string> => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be configured.');
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await axios.post<SpotifyTokenResponse>(
        TOKEN_ENDPOINT,
        querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
        {
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    if (response.data.refresh_token && response.data.refresh_token !== refreshToken) {
        await saveRefreshToken(response.data.refresh_token);
    }

    return response.data.access_token;
};

const getAccessToken = async (): Promise<string> => {
    if (process.env.NODE_ENV === 'production' && !redis) {
        throw new Error('Configure Upstash Redis to persist Spotify refresh-token updates in production.');
    }

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
        throw new Error('SPOTIFY_REFRESH_TOKEN must be configured to load currently playing data.');
    }

    try {
        return await requestAccessToken(refreshToken);
    } catch (error) {
        const isInvalidGrant = axios.isAxiosError(error) && error.response?.data?.error === 'invalid_grant';
        const canRetryWithInitialToken = isInvalidGrant && initialRefreshToken && initialRefreshToken !== refreshToken;

        if (!canRetryWithInitialToken) throw error;

        console.warn('The saved Spotify refresh token expired; retrying with the configured initial token.');
        inMemoryRefreshToken = initialRefreshToken;
        try {
            await redis?.del(REFRESH_TOKEN_KEY);
        } catch (deleteError) {
            console.error('Could not clear the expired Spotify refresh token from Redis:', describeError(deleteError));
        }

        return requestAccessToken(initialRefreshToken);
    }
};

export const getNowPlaying = async (): Promise<CurrentlyPlayingTrack | null> => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get<SpotifyData>(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Cache-Control': 'no-cache',
            },
        });

        if (response.status === 204) return null;

        const track = response.data;
        if (track.currently_playing_type !== 'track' || !track.item) return null;

        return { ...track, item: track.item };
    } catch (error) {
        console.error('Error fetching now playing data:', describeError(error));
        return null;
    }
};
