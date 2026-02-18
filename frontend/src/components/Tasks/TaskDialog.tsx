import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Heading,
  Input,
  NativeSelect,
  Portal,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Task, TaskFormData } from "@/types";
import { createTaskDefaults } from "@/constants/tasks";
import { formatDateForInput } from "@/utils/formatDateForInput";

interface Props {
  open: boolean;
  task?: Task | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
}

export function TaskDialog({ open, task, loading, onClose, onSubmit }: Props) {
  const isEditing = !!task;
  console.log(task);

  const form = useForm<TaskFormData>({
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          status: task.status,
          endAt: formatDateForInput(task.endAt) ?? "",
        }
      : createTaskDefaults,
  });

  const submit = form.handleSubmit(onSubmit);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      placement={"center"}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Heading size="md">
                {isEditing ? "Editar Task" : "Nova Task"}
              </Heading>
            </Dialog.Header>

            <form onSubmit={submit}>
              <Dialog.Body>
                <Stack gap={5}>
                  <Field.Root required>
                    <Field.Label>
                      Título <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      size="lg"
                      bg="whiteAlpha.100"
                      {...form.register("title", { required: true })}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>
                      Descrição <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                      resize="vertical"
                      bg="whiteAlpha.100"
                      {...form.register("description", { required: true })}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Status</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field {...form.register("status")}>
                        <option value="PENDING">Pendente</option>
                        <option value="IN_PROGRESS">Em progresso</option>
                        <option value="DONE">Finalizado</option>
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Data de conclusão</Field.Label>
                    <Input type="date" {...form.register("endAt")} />
                  </Field.Root>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer>
                <Button variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>

                <Button type="submit" colorScheme="blue" loading={loading}>
                  {isEditing ? "Salvar" : "Criar Task"}
                </Button>
              </Dialog.Footer>
            </form>

            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
