import { NextResponse, NextRequest } from 'next/server';

import { ACCESS_TOKEN_KEY } from './lib/constants/storageKey';

const middleware = async (request: NextRequest) => {
  const loginPath = '/login';

  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY);

  const nextAuthToken = request.cookies.get('next-auth.session-token');

  if (loginPath === request.nextUrl.pathname) {
    if (accessToken && nextAuthToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (!accessToken && !nextAuthToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/login', '/'],
};

export default middleware;
