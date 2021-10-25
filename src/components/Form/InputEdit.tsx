import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
  InputProps as ChakraInputProps,
  Input as ChakraInput,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  value?: string;
}

const InputEditBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, value, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Box bg="white" height="100px" p={4} color="gray.50">
        {!!label && (
          <FormLabel
            id={name}
            htmlFor={name}
            fontSize="md"
            color="gray.400"
            fontWeight="normal"
          >
            {label}
          </FormLabel>
        )}

        <ChakraInput
          w="100%"
          id={name}
          fontSize="lg"
          name={name}
          focusBorderColor="pink.500"
          borderColor="white"
          color="gray.700"
          ref={ref}
          {...rest}
        />
      </Box>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputEdit = forwardRef(InputEditBase);
