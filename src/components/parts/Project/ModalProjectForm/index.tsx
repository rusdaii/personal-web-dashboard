'use client';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineClear } from 'react-icons/md';
import ReactSelectAsyncCreatable from 'react-select/async-creatable';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

import { useSkills } from '@/query/skills';
import { createProject, updateProject } from '@/repositories/project';
import { Project } from '@/repositories/project/types';
import { getSkills } from '@/repositories/skills';

import { ProjectPayload, Skill } from './type';

export type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
};

export type SkillsOption = {
  value: string;
  label: string;
};

const ModalProjectForm = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<ProjectPayload>();

  const [fileImage, setFileImage] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const { data: skillsData } = useSkills();

  const skillsOptions = useMemo(() => {
    const skills = skillsData?.data || [];

    if (!skills) {
      return [];
    }

    return skills.map((skill) => ({
      value: skill.id,
      label: skill.name,
    }));
  }, [skillsData]);

  const loadSkillsOptions = useDebouncedCallback(
    (inputValue: string, callback) => {
      getSkills(inputValue)
        .then(({ data }) => {
          const options = data.map((skill) => ({
            value: skill.id,
            label: skill.name,
          }));

          callback(options);
        })
        .catch(() => {
          callback([]);
        });
    },
    500
  );

  const defaultValues = useCallback(() => {
    setValue('name', '');
    setValue('description', '');
    setValue('github', '');
    setValue('demo', '');
    setValue('skills', []);
    setFileImage(null);
  }, [setValue]);

  useEffect(() => {
    if (project) {
      setIsEditMode(true);
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('github', project.github);
      setValue('demo', project.demo);
      setValue(
        'skills',
        project?.skills.map((skill) => {
          const exist = skillsOptions.find(
            (option) => option.value === skill.id
          );

          return exist || { value: '', label: '' };
        })
      );
    } else {
      setIsEditMode(false);
      defaultValues();
    }
  }, [project, setValue, defaultValues, skillsOptions]);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success('Project created successfully');

      defaultValues();

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      queryClient.invalidateQueries({
        queryKey: ['skills'],
      });

      onClose();

      router.refresh();
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success('Project updated successfully');

      defaultValues();

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      queryClient.invalidateQueries({
        queryKey: ['skills'],
      });

      onClose();

      router.refresh();
    },
  });

  const onSubmit = useCallback(
    (data: ProjectPayload) => {
      const payload = new FormData();

      const skills = data.skills.map((skill: Skill) => skill.label);

      fileImage ? payload.append('image', fileImage as File) : null;

      payload.append('name', data.name);
      payload.append('description', data.description);
      payload.append('github', data.github);
      payload.append('demo', data.demo);
      skills.forEach((skill) => {
        payload.append('skills', skill);
      });

      if (isEditMode) {
        updateProjectMutation.mutate({
          id: project?.id,
          payload: payload,
        });

        return;
      }

      createProjectMutation.mutate({
        payload,
      });
    },
    [
      createProjectMutation,
      updateProjectMutation,
      project,
      isEditMode,
      fileImage,
    ]
  );

  const handleClose = () => {
    onClose();
    setFileImage(null);
    defaultValues();
    clearErrors();
  };

  const handleFIleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileImage(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setFileImage(null);

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior="outside">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </ModalHeader>

          <ModalBody className="flex flex-col gap-3">
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Project name is required' }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  variant="bordered"
                  type="text"
                  label="Project Name"
                  aria-label="Project Name"
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: 'Project description is required' }}
              render={({ field: { onChange, value, name } }) => (
                <Textarea
                  label="Project Description"
                  aria-label="Project Description"
                  type="text"
                  variant="bordered"
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="github"
              rules={{ required: 'Github URL is required' }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  variant="bordered"
                  type="text"
                  label="Github"
                  aria-label="Github"
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.github}
                  errorMessage={errors.github?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="demo"
              rules={{ required: 'Demo URL is required' }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  variant="bordered"
                  type="text"
                  label="Demo URL"
                  aria-label="Demo URL"
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.demo}
                  errorMessage={errors.demo?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="skills"
              rules={{ required: 'Skills are required' }}
              render={({ field: { onChange, value, name } }) => (
                <ReactSelectAsyncCreatable
                  name={name}
                  value={value}
                  onChange={onChange}
                  defaultOptions={skillsOptions}
                  loadOptions={loadSkillsOptions}
                  placeholder="Select skills"
                  isMulti
                  isSearchable
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                    colors: {
                      ...theme.colors,
                      primary: 'blue',
                    },
                  })}
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                />
              )}
            />

            <label htmlFor="file-upload">
              <div className="flex justify-between items-center gap-1 mb-2 mt-5">
                <input
                  type="file"
                  ref={fileRef}
                  id="file-upload"
                  onChange={handleFIleChange}
                  className="file__input"
                />

                {fileImage ? (
                  <Button
                    isIconOnly
                    aria-label="Clear"
                    variant="ghost"
                    size="sm"
                    color="primary"
                    onPress={handleClearFile}
                  >
                    <MdOutlineClear />
                  </Button>
                ) : null}
              </div>
              <span className="text-default-400 text-xs">
                PNG, JPG or JPEG (MAX. 1MB)
              </span>
            </label>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              isLoading={
                isEditMode
                  ? updateProjectMutation.isPending
                  : createProjectMutation.isPending
              }
              isDisabled={
                isEditMode
                  ? updateProjectMutation.isPending
                  : createProjectMutation.isPending
              }
            >
              {isEditMode
                ? updateProjectMutation.isPending
                  ? 'Loading...'
                  : 'Update'
                : createProjectMutation.isPending
                ? 'Loading...'
                : 'Create'}
            </Button>

            <Button color="primary" variant="flat" onPress={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalProjectForm;
