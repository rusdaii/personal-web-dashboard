import { Link, Image } from '@nextui-org/react';
import { FaCode, FaHome, FaLaptopCode } from 'react-icons/fa';

import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <aside
      className="flex flex-col items-center w-24 py-8 min-h-dvh overflow-y-auto 
    bg-[#E4E4E7] dark:bg-neutral-800 dark:border-gray-700"
    >
      <nav className="flex flex-col  items-center flex-1 space-y-6">
        <Link href="/">
          <Image
            className="w-16 h-16 "
            src="/icons/logo.png"
            alt="logo"
            radius="full"
          />
        </Link>

        <SidebarLink href="/" title="Dashboard">
          <FaHome className="w-6 h-6 text-white" />
        </SidebarLink>

        <SidebarLink href="/projects" title="Projects">
          <FaCode className="w-6 h-6 text-white" />
        </SidebarLink>

        <SidebarLink href="/skill" title="Skills">
          <FaLaptopCode className="w-6 h-6 text-white" />
        </SidebarLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
