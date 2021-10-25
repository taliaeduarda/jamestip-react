import { Flex, Text, Box, Avatar, Button } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

interface ProfilePros {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfilePros) {
  const history = useHistory();
  const { user, signOutWithGoogle } = useAuth();

  async function handleWhithSignOut() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    signOutWithGoogle();

    history.push("/");
  }

  return user ? (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.name}</Text>
          <Button
            variant="outline"
            borderColor="white"
            size="xm"
            onClick={handleWhithSignOut}
          >
            sair
          </Button>
        </Box>
      )}

      <Avatar size="md" name="Usuário" src={user.avatar} />
    </Flex>
  ) : (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>User</Text>
          <Text color="gray.300" fontSize="small">
            user@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="User"
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      />
    </Flex>
  );
}
