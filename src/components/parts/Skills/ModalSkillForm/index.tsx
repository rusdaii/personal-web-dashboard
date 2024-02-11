'use client';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { MdOutlineClear } from 'react-icons/md';
import { toast } from 'react-toastify';

import { createSkill, updateSkill } from '@/repositories/skills';
import { Skill } from '@/repositories/skills/types';

import { SkillPayload } from './type';

export type ModalSkillFormProps = {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill;
};

const ModalSkillForm = ({ isOpen, onClose, skill }: ModalSkillFormProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<SkillPayload>();

  const [fileImage, setFileImage] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const defaultValues = useCallback(() => {
    setValue('name', '');

    setFileImage(null);
  }, [setValue]);

  useEffect(() => {
    if (skill) {
      setIsEditMode(true);

      setValue('name', skill.name);

      return;
    }

    setIsEditMode(false);
    defaultValues();
  }, [skill, setValue, defaultValues]);

  const createSkillMutation = useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      toast.success('Skill created successfully');

      defaultValues();

      queryClient.invalidateQueries({
        queryKey: ['skills'],
      });

      onClose();

      router.refresh();
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: updateSkill,
    onSuccess: () => {
      toast.success('Skill updated successfully');

      defaultValues();

      queryClient.invalidateQueries({
        queryKey: ['skills'],
      });

      onClose();

      router.refresh();
    },
  });

  const onSubmit = useCallback(
    (data: SkillPayload) => {
      const payload = new FormData();

      fileImage ? payload.append('image', fileImage as File) : null;

      payload.append('name', data.name);

      if (isEditMode) {
        updateSkillMutation.mutate({
          id: skill?.id,
          payload: payload,
        });
        return;
      }

      createSkillMutation.mutate({
        payload,
      });
    },
    [createSkillMutation, fileImage, isEditMode, skill, updateSkillMutation]
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
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {isEditMode ? 'Update Skill' : 'Create Skill'}
          </ModalHeader>

          <ModalBody className="flex flex-col gap-3">
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Skill name is required',
              }}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  variant="bordered"
                  type="text"
                  label="Skill Name"
                  aria-label="Skill Name"
                  name={name}
                  value={value}
                  onChange={onChange}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
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
              <span className="text-default-400 text-xs">SVG (MAX. 1MB)</span>
            </label>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              isLoading={
                isEditMode
                  ? updateSkillMutation.isPending
                  : createSkillMutation.isPending
              }
              isDisabled={
                isEditMode
                  ? updateSkillMutation.isPending
                  : createSkillMutation.isPending
              }
            >
              {isEditMode
                ? updateSkillMutation.isPending
                  ? 'Loading...'
                  : 'Update'
                : createSkillMutation.isPending
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

export default ModalSkillForm;
