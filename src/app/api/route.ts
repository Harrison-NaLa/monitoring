import {getTrackData} from '@/app/tracks/store/tracks.request';

export async function GET() {
    const msm = 'Hello, Next.js!'
    const track = await getTrackData<{name: string, artists: any[]}>('/5oFX4zn4CIDN0l2RCVuObT');
    return Response.json({track})
}