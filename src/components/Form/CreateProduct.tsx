import { Box, Button, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import createProductFormSchema from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "./Input";
import { useProducts } from "../../contexts/useProducts";

type CreateProductFormData = {
  name: string;
  provider: string;
  code: number;
  category: string;
  price: string;
  amount: number;
};

interface CreateProductProps {
  onClose: () => void;
}

export default function CreateProduct({ onClose }: CreateProductProps) {
  const { createProduct } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createProductFormSchema),
  });

  const handleCreateProduct: SubmitHandler<CreateProductFormData> = async (
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
    await createProduct(product);

    onClose();
  };

  return (
    <Flex w="100%" mx="auto"  p={2}>
      <Box
        as="form"
        flex="1"
        py={[4]}
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              type="string"
              label="Nome do produto"
              error={errors.name}
              {...register("name")}
            />

            <Input
              type="string"
              label="Price"
              error={errors.price}
              {...register("price")}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              type="number"
              label="Quantidade"
              error={errors.amount}
              {...register("amount")}
            />

            <Input
              type="number"
              label="Código"
              error={errors.code}
              {...register("code")}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              type="text"
              label="Fornecedor"
              error={errors.provider}
              {...register("provider")}
            />

            <Input
              type="text"
              label="Categoria"
              error={errors.category}
              {...register("category")}
            />
          </SimpleGrid>
        </VStack>
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
