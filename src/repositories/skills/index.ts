import fetcher from '@/lib/fetcher';

import { SkillResponse, GetSkillsResponse } from './types';

export const getSkills = async (filters?: string) => {
  const response = await fetcher<GetSkillsResponse>({
    url: '/skills',
    query: {
      name: filters,
    },
  });

  return response;
};

export const createSkill = async ({ payload }: { payload: FormData }) => {
  const response = await fetcher<SkillResponse>({
    url: '/skills',
    method: 'POST',
    body: payload,
    options: {
      isFormData: true,
    },
  });

  return response;
};

export const updateSkill = async ({
  id,
  payload,
}: {
  id: string | undefined;
  payload: FormData;
}) => {
  const response = await fetcher<SkillResponse>({
    url: `/skills/${id}`,
    method: 'PUT',
    body: payload,
    options: {
      isFormData: true,
    },
  });

  return response;
};

export const deleteSkill = async (id: string) => {
  const response = await fetcher({
    url: `/skills/${id}`,
    method: 'DELETE',
  });

  return response;
};
