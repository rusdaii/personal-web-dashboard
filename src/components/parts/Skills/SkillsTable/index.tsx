'use client';
import { useCallback, useEffect, useState } from 'react';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

import ModalConfirmation from '@/components/elements/ModalConfirmation';
import ModalSkillForm from '@/components/parts/Skills/ModalSkillForm';
import { useSkills } from '@/query/skills';
import { deleteSkill } from '@/repositories/skills';
import { Skill } from '@/repositories/skills/types';

import { colums } from './column';

const SkillsTable = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  const { data: skillsData } = useSkills();

  const skills = skillsData?.data || [];

  useEffect(() => {
    if (skillsData) {
      setIsLoading(false);
    }
  }, [skillsData]);

  const openModalHandler = () => {
    setIsOpenFormModal(true);
  };

  const closeModalHandler = () => {
    if (isOpenFormModal) setIsOpenFormModal(false);

    if (isOpenDeleteModal) setIsOpenDeleteModal(false);

    setSelectedSkill(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      toast.success('Skill deleted successfully');

      closeModalHandler();

      queryClient.invalidateQueries({
        queryKey: ['skills'],
      });
    },
  });

  const handleDelete = useCallback(
    (selectedSkill: Skill) => {
      deleteMutation.mutate(selectedSkill.id);
    },
    [deleteMutation]
  );

  const Actions = ({ skill }: { skill: Skill }) => {
    return (
      <div className="relative flex justify-center items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <FaEllipsisVertical className="text-default-600" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Actions"
            selectionMode="single"
            onAction={(key) => {
              setSelectedSkill(skill);

              if (key === 'edit') {
                openModalHandler();
              }

              if (key === 'delete') {
                setIsOpenDeleteModal(true);
              }
            }}
          >
            <DropdownItem key="edit" startContent={<FaEdit />}>
              Edit
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<FaTrash />}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  const skillDate = (args: string) => {
    return moment(args).fromNow();
  };

  const topContent = () => {
    return (
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">My Skills</h1>

        <Button
          color="primary"
          endContent={<FiPlus />}
          onClick={openModalHandler}
        >
          Add New
        </Button>
      </div>
    );
  };

  return (
    <div className="p-10 w-full">
      <Table
        topContent={topContent()}
        topContentPlacement="outside"
        aria-label="Skills Table"
        classNames={{
          table: 'min-h-[400px]',
        }}
      >
        <TableHeader columns={colums} aria-label="Skills Table Header">
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {skills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell aria-label="Skill Name">{skill.name}</TableCell>
              <TableCell aria-label="Skill Image">{skill.image}</TableCell>
              <TableCell aria-label="Skill Date">
                {skillDate(skill.updatedAt)}
              </TableCell>
              <TableCell aria-label="Actions">
                <Actions skill={skill} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalSkillForm
        isOpen={isOpenFormModal}
        onClose={closeModalHandler}
        skill={selectedSkill!}
      />

      <ModalConfirmation
        title={selectedSkill?.name || ''}
        IsOpen={isOpenDeleteModal}
        onClose={closeModalHandler}
        IsLoading={deleteMutation.isPending}
        handleDelete={() => handleDelete(selectedSkill!)}
      />
    </div>
  );
};

export default SkillsTable;
