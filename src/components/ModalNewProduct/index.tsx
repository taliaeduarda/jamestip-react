import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import CreateProduct from "../Form/CreateProduct";

interface ModalNewProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalNewProduct({ isOpen, onClose }: ModalNewProductProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {" "}
          <Heading as="h4" size="md" mb={4}>
            Adicionar produto
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateProduct onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
