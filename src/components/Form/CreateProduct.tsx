import {
  Box,
  Button,
  Flex,
  Select,
  SimpleGrid,
  VStack,
  HStack,
  FormLabel,
} from "@chakra-ui/react";
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
    <Flex w="100%" mx="auto">
      <Box
        borderTopColor="gray.150"
        borderTopWidth="1px"
        as="form"
        flex="1"
        p={4}
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <VStack spacing="5">
          <SimpleGrid minChildWidth="240px" spacing={12} w="100%" mt={6}>
            <Input
              type="string"
              label="Nome do produto"
              error={errors.name}
              {...register("name")}
            />
            <Box>Proprietário da conta</Box>
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={12} w="100%">
            <Input
              type="number"
              label="Código"
              error={errors.code}
              {...register("code")}
            />
            <Input
              type="string"
              label="Price"
              error={errors.price}
              {...register("price")}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={12} w="100%">
            <Input
              type="text"
              label="Fornecedor"
              error={errors.provider}
              {...register("provider")}
            />
            <Input
              type="number"
              label="Quantidade"
              error={errors.amount}
              {...register("amount")}
            />
          </SimpleGrid>

          <SimpleGrid
            minChildWidth="240px"
            spacing={12}
            w="50%"
            alignSelf="flex-start"
          >
            <HStack>
              <FormLabel
                w="20%"
                fontSize="md"
                color="gray.600"
                fontWeight="normal"
              >
                Categoria
              </FormLabel>
              <Select {...register("category")} w="80%">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </HStack>
          </SimpleGrid>
        </VStack>
        <Flex></Flex>
        <Flex mt="8" justify="flex-end">
          <Box>
            <Button variant="outline" mr="4" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="blackAlpha"
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
