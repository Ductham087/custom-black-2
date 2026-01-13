import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isbot } from "isbot";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = isbot(userAgent);

  const pathname = request.nextUrl.pathname;

  if (isBot && pathname.match(/^\/[^\/]+$/)) {
    const slug = pathname.substring(1);
    const url = request.nextUrl.clone();
    url.pathname = `/metadata-preview/${slug}`;
    return NextResponse.rewrite(url);
  }

  if (isBot) {
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
