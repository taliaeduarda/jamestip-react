import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
} from "@chakra-ui/react";

import EditProduct from "../Form/EditProduct";

interface Product {
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
  createdAt: string;
}

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product[];
}

export function ModalInfo({ isOpen, onClose, product }: ModalInfoProps) {
  console.log(product);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={5} display="flex">
          {" "}
          <Heading
            as="h2"
            size="lg"
            isTruncated
            color="gray.400"
            fontWeight="normal"
          >
            Produtos
          </Heading>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody bgColor="gray.10" p={8}>
          <EditProduct onClose={onClose} product={product} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
