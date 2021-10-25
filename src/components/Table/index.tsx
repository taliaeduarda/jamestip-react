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
import { useState } from "react";

interface Products {
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
  createdAt: string;
}

interface ProductsTableProps {
  products: Products[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [productInfo, setProductInfo] = useState<Products[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleShowProductInfo(productCode: number) {
    const newProducts = [...products];
    const selectedProduct = newProducts.filter(
      (product) => product.code === productCode
    );
    setProductInfo(selectedProduct);
    onOpen();
  }

  return (
    <>
      <ModalInfo isOpen={isOpen} onClose={onClose} product={productInfo} />
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
                onClick={() => handleShowProductInfo(product.code)}
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
