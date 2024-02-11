import React from 'react';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { FaChevronDown } from 'react-icons/fa';

import { Skill } from '@/repositories/skills/types';

type Props = {
  skills: Skill[];
};

const SkillsCell = ({ skills }: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <FaChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="skills dropdown" items={skills}>
        {(item) => <DropdownItem key={item.id}>{item.name}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SkillsCell;
