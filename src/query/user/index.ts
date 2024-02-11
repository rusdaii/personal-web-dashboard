import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/repositories/user';

export const getUserKey = (id: string) => ['user', id];

export const useUser = (id: string) => {
  const result = useQuery({
    queryKey: getUserKey(id),
    queryFn: () => getUser(id),
  });

  return result;
};
