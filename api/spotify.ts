import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv'

dotenv.config()

const token = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;


interface SpotifyData {
    is_playing: boolean;
    item: {
        name: string;
        album: {
            name: string;
            artists: Array<{ name: string }>;
            images: [{ url: string }];
        };
        external_urls: {
            spotify: string;
        };
    };
    currently_playing_type: string;
}

const getAccessToken = async (): Promise<string> => {
    const res = await axios.post<{ access_token: string }>(
        TOKEN_ENDPOINT,
        querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        }),
        {
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return res.data.access_token;
};

export const getNowPlaying = async (): Promise<SpotifyData | null> => {
    try {
        const access_token = await getAccessToken();
        const response = await axios.get<SpotifyData>(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (
            response.status === 204 ||
            response.status > 400 ||
            response.data.currently_playing_type !== 'track'
        ) {
            return null;
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching now playing data:', error);
        return null;
    }
};
