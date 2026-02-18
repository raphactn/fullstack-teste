import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Task } from "@/types";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog";
import { taskStatus } from "@/constants/tasks";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: Props) {
  const status = taskStatus[task.status];

  return (
    <Card.Root>
      <Card.Body>
        <Badge
          bg={status.colorScheme}
          variant="subtle"
          w="max-content"
          size="sm"
        >
          {status.label}
        </Badge>
        <HStack mb="6" mt={1} gap="3">
          <Stack gap="0" maxW={"100%"}>
            <Text fontWeight="semibold" fontSize="lg" truncate>
              {task.title}
            </Text>

            {task.endAt && (
              <Text color="gray.400" fontSize="sm">
                Finalização:{" "}
                {new Date(task.endAt).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
              </Text>
            )}
          </Stack>
        </HStack>
        {task.description && (
          <Card.Description>{task.description}</Card.Description>
        )}
      </Card.Body>
      <Card.Footer w="full">
        <Button
          size="sm"
          w="full"
          flex={1}
          variant="surface"
          _hover={{ bg: "whiteAlpha.100" }}
          onClick={() => onEdit(task)}
        >
          <BiPencil /> Editar
        </Button>

        <DeleteConfirmationDialog
          onConfirm={onDelete}
          title={`Excluir a tarefa "${task.title}"?`}
          trigger={
            <Button
              size="sm"
              flex={1}
              w="full"
              variant="surface"
              _hover={{ bg: "red.500/20" }}
            >
              <MdDelete /> Excluir
            </Button>
          }
        />
      </Card.Footer>
    </Card.Root>
  );
}
