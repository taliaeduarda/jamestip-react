import { Image, Box } from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";

export function Logo() {
  return (
    <Box>
      <Image boxSize="40px" src={logo} alt="Jamestip logo" />
    </Box>
  );
}
