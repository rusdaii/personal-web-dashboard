import { ReactNode } from 'react';

import { Button, Tooltip } from '@nextui-org/react';

import { Link } from '@/components/elements/Link';

export type SidebarLinkProps = {
  children?: ReactNode;
  title: string;
  href: string;
};

const SidebarLink = ({ children, title, href }: SidebarLinkProps) => {
  return (
    <Tooltip showArrow={true} content={title} placement="right">
      <Button
        isIconOnly
        color="primary"
        className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 
          rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-blue-500"
      >
        <Link href={href}>{children}</Link>
      </Button>
    </Tooltip>
  );
};

export default SidebarLink;
