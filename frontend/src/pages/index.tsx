import { useAuth } from "@/hooks/useAuth";
import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }

    router.replace("/dashboard");
  }, [user]);
  return (
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>
  );
}
