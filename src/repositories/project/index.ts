import fetcher from '@/lib/fetcher';

import { getProjectsResponse } from './types';

export const getProjects = async () => {
  const response = await fetcher<getProjectsResponse>({
    url: '/projects',
  });

  return response;
};

export const createProject = async ({ payload }: { payload: FormData }) => {
  const response = await fetcher({
    url: '/projects',
    method: 'POST',
    body: payload,
    options: {
      isFormData: true,
    },
  });

  return response;
};

export const updateProject = async ({
  id,
  payload,
}: {
  id: string | undefined;
  payload: FormData;
}) => {
  const response = await fetcher({
    url: `/projects/${id}`,
    method: 'PUT',
    body: payload,
    options: {
      isFormData: true,
    },
  });

  return response;
};

export const deleteProject = async (id: string) => {
  const response = await fetcher({
    url: `/projects/${id}`,
    method: 'DELETE',
  });
  return response;
};
