import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url).searchParams.get('url');
    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    const headers = new Headers({
      'Content-Disposition': `attachment; filename="${videoTitle}.mp4"`,
      'Content-Type': 'video/mp4',
      'Transfer-Encoding': 'chunked'
    });

    const stream = ytdl(url, {
      format: format,
      quality: 'highest'
    });

    return new Response(stream as any, {
      headers: headers
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}