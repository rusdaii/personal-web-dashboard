'use client';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarBrand,
  NavbarContent,
  Navbar as NextNavbar,
} from '@nextui-org/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { GoPersonFill } from 'react-icons/go';

import { Link } from '@/components/elements/Link';
import LogoutButton from '@/components/elements/LogoutButton';
import ThemeSwitch from '@/components/elements/ThemeSwitch/ThemeSwitch';
import { User } from '@/repositories/user/types';

type Props = {
  user?: User;
};

const Navbar = ({ user }: Props) => {
  return (
    <NextNavbar className="w-full" isBordered maxWidth="full" position="static">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">DashboardQue</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <ThemeSwitch mode="navbar" />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              color="primary"
              as="button"
              className="transition-transform"
              src={user?.avatar}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="Profile"
            >
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">{user?.name}</p>
            </DropdownItem>

            <DropdownItem
              key="edit"
              startContent={<GoPersonFill />}
              textValue="Account Settings"
            >
              <Link href={`/account/${user?.id}`} color="foreground">
                Account Settings
              </Link>
            </DropdownItem>

            <DropdownItem
              color="primary"
              startContent={<FaSignOutAlt />}
              textValue="Logout"
            >
              <LogoutButton className="w-full">Logout</LogoutButton>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NextNavbar>
  );
};

export default Navbar;
