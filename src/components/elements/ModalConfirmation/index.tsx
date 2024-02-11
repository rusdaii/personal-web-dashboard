import { Button, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { PiWarningCircleBold } from 'react-icons/pi';

export type ModalConfirmationProps = {
  title: string;
  IsOpen: boolean;
  IsLoading: boolean;
  onClose: () => void;
  handleDelete: () => void;
};

const ModalConfirmation = ({
  title,
  IsOpen,
  IsLoading,
  onClose,

  handleDelete,
}: ModalConfirmationProps) => {
  return (
    <Modal isOpen={IsOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="text-center">
                <PiWarningCircleBold className="mx-auto mb-4 h-14 w-14 text-red-600 " />
                <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                  Are you sure you want to delete{' '}
                  <span className="text-red-600 font-bold">{title}</span>
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    color="danger"
                    isDisabled={IsLoading}
                    isLoading={IsLoading}
                    onPress={() => {
                      handleDelete();
                    }}
                  >
                    {IsLoading ? 'Deleting...' : `Yes, I'm sure`}
                  </Button>
                  <Button color="default" onPress={onClose}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmation;
