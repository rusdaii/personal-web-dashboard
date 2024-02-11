import React from 'react';

import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { FaEye } from 'react-icons/fa';

type Props = {
  projectName: string;
  image: string;
};

const ImageCell = ({ projectName, image }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        onPress={onOpen}
        className="max-w-fit"
        isIconOnly
        size="sm"
        variant="light"
      >
        <FaEye />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{projectName}</ModalHeader>
              <ModalBody>
                <Image
                  src={image}
                  width={400}
                  alt="project image"
                  className="w-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ImageCell;
