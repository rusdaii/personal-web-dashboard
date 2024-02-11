import { useQuery } from '@tanstack/react-query';

import { getSkills } from '@/repositories/skills';

export const getSkillsKey = (filters?: string) => ['skills', filters];

export const useSkills = (filters?: string) => {
  const result = useQuery({
    queryKey: getSkillsKey(filters),
    queryFn: () => getSkills(filters),
  });

  return result;
};
