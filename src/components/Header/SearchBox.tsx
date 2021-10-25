import { useRef } from "react";
import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="200px"
      maxWidth={300}
      alignSelf="center"
      position="relative"
      borderRadius="full"
    >
      <Input
        variant="unstyled"
        px="4"
        placeholder="Buscar na plataforma"
        ref={searchInputRef}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
