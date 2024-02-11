'use client';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { Button, Link } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { MdOutlineClear } from 'react-icons/md';
import { toast } from 'react-toastify';

import { updateUserResume } from '@/repositories/user';

type Props = {
  resume: string | undefined;
};

const EditResume = ({ resume }: Props) => {
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const { handleSubmit } = useForm();

  const handleFIleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setFile(null);

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const handleClose = () => {
    setIsEditMode(!isEditMode);

    handleClearFile();
  };

  const updateResumeMutation = useMutation({
    mutationFn: updateUserResume,
    onSuccess: () => {
      toast.success('Resume updated');

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });

      handleClose();
    },
  });

  const onSubmit = useCallback(() => {
    const payload = new FormData();

    file ? payload.append('resume', file) : null;

    updateResumeMutation.mutate({ payload });
  }, [file, updateResumeMutation]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-4 w-full"
    >
      {isEditMode ? (
        <label htmlFor="file-upload">
          <div className="flex justify-between items-center gap-1 mb-2 mt-5">
            <input
              type="file"
              ref={fileRef}
              id="file-upload"
              onChange={handleFIleChange}
              className="file__input"
            />

            {file ? (
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
          <span className="text-default-400 text-xs">PDF (MAX. 1MB)</span>
        </label>
      ) : (
        <Link href={resume} target="_blank">
          View My Resume
        </Link>
      )}

      {isEditMode && (
        <div className="flex gap-4">
          <Button
            type="submit"
            color="primary"
            isDisabled={updateResumeMutation.isPending}
            isLoading={updateResumeMutation.isPending}
          >
            Upload
          </Button>
          <Button type="button" color="primary" onPress={handleClose}>
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
          Update Resume
        </Button>
      )}
    </form>
  );
};

export default EditResume;
