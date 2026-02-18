import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  Button,
  Card,
  Container,
  Field,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
      toaster.success({
        title: "Login realizado com sucesso!",
      });
      router.replace("/dashboard");
    } catch (err) {
      toaster.error({
        title: "Erro",
        description: getErrorMessage(err),
      });
    }
  };

  return (
    <Container
      display="flex"
      maxW="lg"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Card.Root w="full" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Card.Header>
          <Heading>Entrar na sua conta</Heading>
        </Card.Header>

        <Card.Body>
          <Stack gap="4">
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                placeholder="me@example.com"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email inválido",
                  },
                })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Senha</Field.Label>
              <Input
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Card.Body>

        <Card.Footer>
          <Stack w="full" align="center" gap="3">
            <Button
              w="full"
              colorScheme="purple"
              type="submit"
              loading={isSubmitting}
              loadingText="Aguarde..."
            >
              Entrar
            </Button>

            <Link href="/auth/register">Criar uma nova conta</Link>
          </Stack>
        </Card.Footer>
      </Card.Root>
    </Container>
  );
};

export default Login;
