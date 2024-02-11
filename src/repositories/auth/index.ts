import fetcher from '@/lib/fetcher';

import { AuthPayload, LoginResponse } from './types';

export const login = async ({ email, password }: AuthPayload) => {
  const response = await fetcher<LoginResponse>({
    url: '/auth/login',
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return response;
};
