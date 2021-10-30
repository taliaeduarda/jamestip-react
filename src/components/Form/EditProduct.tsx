import { Box, Button, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import createProductFormSchema from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputEdit } from "./InputEdit";
import { useProducts } from "../../contexts/useProducts";
import { AiOutlineDelete } from "react-icons/ai";

type ProductFormData = {
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
};

interface CreateProductProps {
  onClose: () => void;
  product: ProductFormData;
}

export default function EditProduct({ onClose, product }: CreateProductProps) {
  const { updateProduct, removeProduct } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createProductFormSchema),
  });

  const handleUpdateProduct: SubmitHandler<ProductFormData> = async (
    values
  ) => {
    const product = {
      ...values,
      createdAt: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
    await updateProduct(product);
    onClose();
  };

  function handleRemoveProduct(productCode: number) {
    removeProduct(productCode);
    onClose();
  }

  return (
    <Flex w="100%">
      <Box
        as="form"
        flex="1"
        p={[4]}
        onSubmit={handleSubmit(handleUpdateProduct)}
      >
       
          <Box key={product.code}>
            <Button
              variant="outline"
              float="right"
              leftIcon={<AiOutlineDelete />}
              onClick={() => handleRemoveProduct(product.code)}
            >
              Remover Produto
            </Button>
            <VStack spacing="4">
              <SimpleGrid
                minChildWidth="200px"
                w="70%"
                alignSelf="flex-start"
                borderColor="gray.50"
                borderWidth="1px"
              >
                <InputEdit
                  type="string"
                  defaultValue={product.name}
                  label="Nome do produto"
                  error={errors.name}
                  {...register("name")}
                />

                <InputEdit
                  type="string"
                  label="Price"
                  defaultValue={product.price}
                  error={errors.price}
                  {...register("price")}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" w="70%" alignSelf="flex-start">
                <InputEdit
                  type="number"
                  defaultValue={product.amount.toString()}
                  label="Quantidade"
                  error={errors.amount}
                  {...register("amount")}
                />

                <InputEdit
                  type="number"
                  defaultValue={product.code.toString()}
                  label="Código"
                  error={errors.code}
                  {...register("code")}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" w="70%" alignSelf="flex-start">
                <InputEdit
                  type="text"
                  defaultValue={product.provider}
                  label="Fornecedor"
                  error={errors.provider}
                  {...register("provider")}
                />

                <InputEdit
                  type="text"
                  defaultValue={product.category}
                  label="Categoria"
                  error={errors.category}
                  {...register("category")}
                />
              </SimpleGrid>
            </VStack>
          </Box>
     

        <Flex></Flex>
        <Flex mt="8" justify="flex-end">
          <Box>
            <Button variant="outline" mr="4" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blackAlpha" isLoading={isSubmitting}>
              Salvar
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
