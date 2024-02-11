'use client';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import { MdOutlineClear } from 'react-icons/md';
import { toast } from 'react-toastify';

import { updateUser } from '@/repositories/user';

const EditAvatar = () => {
  const router = useRouter();

  const { update } = useSession();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    onOpenChange();
    handleClearFile();
  };

  const updateAvatarMutation = useMutation({
    mutationFn: updateUser,

    onSuccess: async ({ data }) => {
      toast.success('Avatar updated');

      await update({
        avatar: data?.avatar,
      });

      handleClose();

      router.refresh();
    },
  });

  const onSubmit = useCallback(() => {
    const payload = new FormData();

    if (!file) {
      return toast.error('Please select an image');
    }

    if (file) {
      payload.append('avatar', file);
    }

    updateAvatarMutation.mutate({
      payload,
    });
  }, [file, updateAvatarMutation]);

  return (
    <div className="flex translate-x-10 -translate-y-8">
      <Button
        onPress={onOpen}
        isIconOnly
        aria-label="Change avatar"
        color="primary"
        size="sm"
      >
        <FaCamera size={15} className="text-white" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              <span>Change avatar</span>
            </ModalHeader>
            <ModalBody>
              {file && (
                <div className="flex justify-center">
                  <Image
                    src={URL.createObjectURL(file)}
                    width={300}
                    alt="Preview"
                  />
                </div>
              )}

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
                <span className="text-default-400 text-xs ml-5">
                  JPG or PNG (MAX. 1MB)
                </span>
              </label>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                isLoading={updateAvatarMutation.isPending}
                isDisabled={updateAvatarMutation.isPending}
              >
                Upload
              </Button>
              <Button color="danger" variant="light" onPress={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditAvatar;
