'use client';

import { useCallback, useEffect, useState } from 'react';

import { Button, Input, Textarea } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import EditResume from '@/components/parts/Account/EditResume';
import { updateUser } from '@/repositories/user';
import { User } from '@/repositories/user/types';

import { UpdateUserPayload } from './type';

type Props = {
  user?: User;
};

const AccountForm = ({ user }: Props) => {
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);

  const { handleSubmit, setValue, control } = useForm<UpdateUserPayload>();

  useEffect(() => {
    if (user) {
      setValue('name', user?.name);
      setValue('about', user?.about);
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('User updated');

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });

      setIsEditMode(!isEditMode);
    },
  });

  const onSubmit = useCallback(
    (data: UpdateUserPayload) => {
      const payload = new FormData();

      payload.append('name', data.name);
      payload.append('about', data.about);

      updateUserMutation.mutate({
        payload,
      });
    },
    [updateUserMutation]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, name } }) => (
            <Input
              {...(!isEditMode && { isReadOnly: true })}
              type="text"
              label="Name"
              variant="bordered"
              labelPlacement="outside"
              className="max-w-xl"
              name={name}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="about"
          render={({ field: { onChange, value, name } }) => (
            <Textarea
              {...(!isEditMode && { isReadOnly: true })}
              label="About"
              variant="bordered"
              labelPlacement="outside"
              className="max-w-xl"
              name={name}
              value={value}
              onChange={onChange}
            />
          )}
        />

        {isEditMode && (
          <div className="flex gap-4">
            <Button
              type="submit"
              color="primary"
              isDisabled={updateUserMutation.isPending}
              isLoading={updateUserMutation.isPending}
            >
              Save
            </Button>
            <Button
              type="button"
              color="primary"
              onPress={() => setIsEditMode(!isEditMode)}
            >
              Cancel
            </Button>
          </div>
        )}

        {!isEditMode && (
          <Button
            type="button"
            color="primary"
            onPress={() => setIsEditMode(!isEditMode)}
          >
            Update Profile
          </Button>
        )}
      </form>
      <EditResume resume={user?.resume} />
    </>
  );
};

export default AccountForm;
