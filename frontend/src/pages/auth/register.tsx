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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { register } = useAuth();
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      const { email, name, password } = data;
      await register({ email, name, password });
      toaster.success({
        title: "Conta criada com sucesso!",
      });
      router.replace("/auth/login");
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
      <Card.Root as="form" onSubmit={handleSubmit(onSubmit)} w="full">
        <Card.Header>
          <Heading>Criar sua conta</Heading>
        </Card.Header>

        <Card.Body>
          <Stack gap="4">
            <Field.Root invalid={!!errors.name}>
              <Field.Label>Nome completo</Field.Label>
              <Input
                {...formRegister("name", {
                  required: "Nome é obrigatório",
                })}
              />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                placeholder="me@example.com"
                {...formRegister("email", {
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
                {...formRegister("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.confirmPassword}>
              <Field.Label>Confirmar senha</Field.Label>
              <Input
                type="password"
                placeholder="********"
                {...formRegister("confirmPassword", {
                  required: "Confirme sua senha",
                  validate: (value) =>
                    value === password || "As senhas não coincidem",
                })}
              />
              <Field.ErrorText>
                {errors.confirmPassword?.message}
              </Field.ErrorText>
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
              Criar conta
            </Button>

            <Link href="/auth/login">Voltar para o login</Link>
          </Stack>
        </Card.Footer>
      </Card.Root>
    </Container>
  );
};

export default Register;
