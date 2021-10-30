import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Link,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { ModalInfo } from "../ModalInfo";
import { useState, useEffect } from "react";
import { useProducts } from "../../services/hooks/useProducts";
import { ProductData } from '../../types/index'

export function ProductsTable() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [productSelected, setProductSelected] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();

  const groupsQuery = useProducts();

  useEffect(() => {
    if (groupsQuery.isSuccess) {
      setProducts(groupsQuery.data);
    }
  }, [groupsQuery.data, groupsQuery.isSuccess]);

  async function handlePrefetchProduct(productId: string) {

    setProductSelected(productId)
    onOpen();
  }

return (
  <>
    <ModalInfo isOpen={isOpen} onClose={onClose} product={productSelected} />
    <Table colorScheme="whiteAlpha" variant="simple">
      <Thead>
        <Tr>
          <Th fontSize="md" w="10%">
            Nome
          </Th>
          <Th fontSize="md" w="10%">
            Categoria
          </Th>
          <Th fontSize="md" w="10%">
            Fornecedor
          </Th>
          <Th fontSize="md" w="10%">
            Qty. em estoque
          </Th>
          <Th fontSize="md" w="10%">
            Código
          </Th>
          <Th fontSize="md" w="10%">
            uniti price
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => {
          return (
            <Link
              key={product.code}
              as="tr"
              onClick={() => handlePrefetchProduct(product.id)}
              textDecoration="none"
              _hover={{
                bgColor: "gray.50",
              }}
            >
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>{product.provider}</Td>
              <Td>{product.amount}</Td>
              <Td>{product.code}</Td>
              <Td>{product.price}</Td>
            </Link>
          );
        })}
      </Tbody>
    </Table>
  </>
);
}
