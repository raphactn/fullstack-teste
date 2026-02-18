import { useAuth } from "@/hooks/useAuth";
import { Box, Container, Flex, Heading, IconButton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { BiLogOut } from "react-icons/bi";
import { LuNotebookPen } from "react-icons/lu";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  return (
    <Box w="full">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px={5}
        py={3}
        bg={"Background"}
      >
        <LuNotebookPen size={30} />
        <Flex gap={2} alignItems="center">
          <Heading color="white" size="md">
            {user?.name}
          </Heading>
          <IconButton
            rounded="full"
            variant="outline"
            aria-label="Logout"
            onClick={logout}
          >
            <BiLogOut />
          </IconButton>
        </Flex>
      </Flex>
      <Container maxW="8xl" my={5}>
        {children}
      </Container>
    </Box>
  );
};
