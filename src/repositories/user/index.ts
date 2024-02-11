import fetcher from '@/lib/fetcher';

import { getUserResponse } from './types';

export const getUser = async (id: string | undefined, accessToken?: string) => {
  const response = await fetcher({
    url: `/user/${id}`,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return response as getUserResponse;
};

export const updateUser = async ({
  payload,
}: {
  payload: FormData;
}): Promise<getUserResponse> => {
  const response = await fetcher({
    url: `/user/update/basic`,
    method: 'PUT',
    body: payload,
    options: {
      isFormData: true,
    },
  });

  return response as getUserResponse;
};

export const updateUserResume = async ({ payload }: { payload: FormData }) => {
  const response = await fetcher({
    url: `/user/update/resume`,
    method: 'PUT',
    body: payload,
    options: {
      isFormData: true,
    },
  });

  return response;
};
