import { Avatar } from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { Link } from '@/components/elements/Link';
import LogoutButton from '@/components/elements/LogoutButton';
import ThemeSwitch from '@/components/elements/ThemeSwitch/ThemeSwitch';
import EditAvatar from '@/components/parts/Account/EditAvatar';

const AccountSidebar = async () => {
  const session = await getServerSession(options);

  const { user } = session || {};

  return (
    <aside
      className="flex flex-col w-60 py-8 min-h-dvh overflow-y-auto border-r-primary/20 border-r-2
    dark:bg-neutral-800 dark:border-gray-700"
    >
      <div className="flex flex-col items-center justify-center mb-5">
        <Avatar
          isBordered
          color="primary"
          size="lg"
          className="w-32 h-32"
          src={user?.avatar}
        />
        <EditAvatar />

        <span className="font-semibold text-lg -mt-5">{user?.name}</span>
      </div>

      <nav className="flex flex-col flex-1 space-y-3 p-3">
        <Link
          href="/"
          className="hover:bg-primary text-foreground hover:text-white transition-colors 
          duration-500 ease-in-out p-3 rounded-xl"
        >
          <span className="flex items-center">
            <FaHome className="w-6 h-6 " />
            <span className="ml-2 font-semibold">Home</span>
          </span>
        </Link>

        <LogoutButton
          className="hover:bg-primary text-foreground hover:text-white transition-colors 
        duration-500 ease-in-out p-3 rounded-xl"
        >
          <FaSignOutAlt className="w-6 h-6" />
          <span className="ml-2 font-semibold">Logout</span>
        </LogoutButton>

        <span className="flex justify-center items-center">
          <ThemeSwitch mode="sidebar" />
        </span>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
