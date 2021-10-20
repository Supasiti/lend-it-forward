import { ModalOverlay, ModalContent, Modal } from '@chakra-ui/react';

const BaseModal = ({ onClose, isOpen, children }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior="outside"
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="gunmetal" color="sidecar">
        {children}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
