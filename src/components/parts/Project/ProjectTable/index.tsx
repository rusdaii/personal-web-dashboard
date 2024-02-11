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
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

import ModalConfirmation from '@/components/elements/ModalConfirmation';
import ReadMore from '@/components/elements/ReadMore';
import ModalProjectForm from '@/components/parts/Project/ModalProjectForm/index';
import { useProjects } from '@/query/projects';
import { deleteProject } from '@/repositories/project';
import { Project } from '@/repositories/project/types';

import { colums } from './column';
import ImageCell from './ImageCell';
import SkillsCell from './SkillsCell';
import UrlCell from './UrlCell';

const ProjectTable = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  const { data: projectsData } = useProjects();

  const projects = projectsData?.data || [];

  useEffect(() => {
    if (projectsData) {
      setIsLoading(false);
    }
  }, [projectsData]);

  const openModalHandler = () => {
    setIsOpenFormModal(true);
  };

  const closeModalHandler = () => {
    if (isOpenFormModal) setIsOpenFormModal(false);

    if (isOpenDeleteModal) setIsOpenDeleteModal(false);

    setSelectedProject(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success('Project deleted successfully');

      closeModalHandler();

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });

  const handleDelete = useCallback(
    (selectedProject: { id: string }) => {
      deleteMutation.mutate(selectedProject.id);
    },
    [deleteMutation]
  );

  const topContent = () => {
    return (
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">My Projects</h1>

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

  const Actions = ({ project }: { project: Project }) => {
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
              setSelectedProject(project);

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

  return (
    <div className="p-10">
      <Table
        topContent={topContent()}
        topContentPlacement="outside"
        aria-label="Project Table"
        classNames={{
          table: 'min-h-[400px]',
        }}
      >
        <TableHeader columns={colums} aria-label="Project Table Header">
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium" aria-label="Project Name">
                {project.name}
              </TableCell>

              <TableCell className="max-w-72" aria-label="Description">
                <ReadMore>{project.description}</ReadMore>
              </TableCell>

              <TableCell aria-label="Image">
                <ImageCell projectName={project.name} image={project.image} />
              </TableCell>

              <TableCell aria-label="Github">
                <UrlCell title={project.name} url={project.github} />
              </TableCell>

              <TableCell aria-label="Demo">
                <UrlCell title={project.name} url={project.demo} />
              </TableCell>

              <TableCell aria-label="Skills">
                <SkillsCell skills={project.skills} />
              </TableCell>

              <TableCell aria-label="Actions">
                <Actions project={project} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalProjectForm
        isOpen={isOpenFormModal}
        onClose={closeModalHandler}
        project={selectedProject!}
      />

      <ModalConfirmation
        title={selectedProject?.name || ''}
        IsOpen={isOpenDeleteModal}
        onClose={closeModalHandler}
        IsLoading={deleteMutation.isPending}
        handleDelete={() => handleDelete(selectedProject!)}
      />
    </div>
  );
};

export default ProjectTable;
