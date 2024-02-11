import { getCookie as getCookieNext, setCookie } from 'cookies-next';

export const getNextCookieStore = () => {
  const { cookies } = require('next/headers');

  return cookies();
};

export const getCookie = (name: string) => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const cookiesStore = getNextCookieStore();

    return cookiesStore.get(name)?.value;
  }

  return getCookieNext(name);
};

export const setAccessToken = (accessToken: string, options?: any) => {
  const MAX_AGE_ACCESS_TOKEN = 60 * 60 * 24 * 1; // 1 days

  const accessTokenKey: string =
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? 'undefined';

  setCookie(accessTokenKey, accessToken, {
    maxAge: MAX_AGE_ACCESS_TOKEN,
    ...options,
  });
};
