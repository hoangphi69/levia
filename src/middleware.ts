import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/session';

export default async function middleware(req: NextRequest) {
  const {
    cookies,
    url,
    nextUrl: { pathname },
  } = req;

  // Exclude non-admin routes
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  // Exclude /admin/login route
  if (pathname.startsWith('/admin/login')) return NextResponse.next();

  // Verify session for authorization
  const cookie = cookies.get('session')?.value;
  const session = await decrypt(cookie);
  if (!session?.id) return NextResponse.redirect(new URL('/admin/login', url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
