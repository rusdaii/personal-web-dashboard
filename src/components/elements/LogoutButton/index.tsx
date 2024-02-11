'use client';
import { ReactNode, useCallback } from 'react';

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

import { ACCESS_TOKEN_KEY } from '@/lib/constants/storageKey';

type Props = {
  className?: string;
  children?: ReactNode;
};

const LogoutButton = ({ className, children }: Props) => {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await signOut({
      redirect: false,
    });

    deleteCookie(ACCESS_TOKEN_KEY);

    toast.success('Logout successful');

    router.replace('/login');
  }, [router]);

  return (
    <button onClick={handleSignOut} className={className}>
      <span className="flex items-center">{children}</span>
    </button>
  );
};

export default LogoutButton;
