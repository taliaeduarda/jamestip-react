import {
  Box,
  Button,
  Flex,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { ModalNewProduct } from "../../components/ModalNewProduct";
import { ProductsTable } from "../../components/Table";
// import { Pagination } from "../../components/Pagination";
import { useProducts } from "../../services/hooks/useProducts";
import { MdOutlineAdd } from "react-icons/md";

export default function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, error } = useProducts();

  return (
    <Box>
      <Header />

      <Flex w="95%" my="4" mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="white.100" p="8">
          <Flex mb="8" justify="space-between" align="center">
          
            <Button
              leftIcon={<MdOutlineAdd />}
              colorScheme="blackAlpha"
              onClick={onOpen}
            >
              <ModalNewProduct isOpen={isOpen} onClose={onClose} />
              Adicionar
            </Button>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <ProductsTable />

              {/* <Pagination
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onPageChange={setPage}
            /> */}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
