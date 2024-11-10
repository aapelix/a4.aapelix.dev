import { NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url).searchParams.get('url');
    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    // Get video info to set proper filename and content type
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, ''); // Clean the title
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    // Create response headers for file download
    const headers = new Headers({
      'Content-Disposition': `attachment; filename="${videoTitle}.mp4"`,
      'Content-Type': 'video/mp4',
      'Transfer-Encoding': 'chunked'
    });

    // Create and return the streaming response
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