import { getServerSession } from 'next-auth';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

// eslint-disable-next-line import-alias/import-alias
import { options } from '../../api/auth/[...nextauth]/options';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(options);

  const user = session?.user;

  return (
    <div className="min-h-dvh">
      <div className="flex flex-row">
        <Sidebar />

        <div className="flex flex-col w-full">
          <Navbar user={user} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
