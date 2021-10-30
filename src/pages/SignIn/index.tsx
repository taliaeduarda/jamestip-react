import { Flex, Button, Stack, FormLabel } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";

import { Input } from "../../components/Form/Input";
import { FcGoogle } from "react-icons/fc";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const history = useHistory();
  const { signInWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    history.push("/products");
  };

  async function handleSignInWithGoogle() {
    await signInWithGoogle();

    history.push("/products");
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" flexDir="column">

      <Flex
        as="form"
        width="100%"
        maxWidth={400}
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
        bgColor="white.100"
      >
        <Stack spacing="4">
          <FormLabel>E-mail</FormLabel>
          <Input type="email" error={errors.email} {...register("email")} />
          <FormLabel>Senha</FormLabel>

          <Input
            type="password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          bgColor="teal.200"
          size="lg"
          color="white"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>

        <Button
          rightIcon={<FcGoogle />}
          colorScheme="teal"
          size="lg"
          mt="6"
          variant="outline"
          onClick={handleSignInWithGoogle}
        >
          Entrar com o Google
        </Button>
      </Flex>
    </Flex>
  );
}
