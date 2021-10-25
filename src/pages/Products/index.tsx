import { Box, Flex, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import { Header } from "../../components/Header";
import { ModalNewProduct } from "../../components/ModalNewProduct";
import { ProductsTable } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { useProducts } from "../../contexts/useProducts";

export default function Products() {
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products } = useProducts();

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" mx="auto">
        <Flex borderRadius={8} px="8" fontSize="md" w="95%" mx="auto">
          <Button colorScheme="blackAlpha">Todos os produtos ({products.length})</Button>
          <Spacer />
          <Button colorScheme="blackAlpha" onClick={onOpen}>
            <ModalNewProduct isOpen={isOpen} onClose={onClose} />
            Adicionar
          </Button>
        </Flex>
      </Flex>

      <Flex w="95%" my="6" mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="white.100" p="8" fontSize="md">
          <ProductsTable products={products} />

          <Pagination
            totalCountOfRegisters={products.length}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </Flex>
    </Box>
  );
}
