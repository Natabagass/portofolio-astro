import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    try {
        const { getNowPlaying } = await import('../../../api/spotify');
        const track = await getNowPlaying();

        return new Response(JSON.stringify(track), {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error(
            'Could not load Spotify now-playing data:',
            error instanceof Error ? error.message : 'Unknown error'
        );

        return new Response('null', {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-store',
            },
        });
    }
};
