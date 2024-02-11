import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { options } from '@/app/api/auth/[...nextauth]/options';

export const pageAuthorization = async (roleAccepted: string) => {
  const session = await getServerSession(options);

  const user = session?.user;

  if (user?.role !== roleAccepted) {
    redirect('/login');
  }

  return user;
};
