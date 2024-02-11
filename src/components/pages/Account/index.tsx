'use client';
import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import AccountForm from '@/components/parts/Account/AccountForm';
import { useUser } from '@/query/user';

const Account = () => {
  const params: { id: string } = useParams();

  const { data: getUser } = useUser(params.id);

  const user = useMemo(() => getUser?.data, [getUser?.data]);

  return (
    <div className="min-h-dvh flex flex-col items-center p-20 gap-10">
      <h1 className="text-3xl font-bold">Account Details</h1>
      <AccountForm user={user} />
    </div>
  );
};

export default Account;
