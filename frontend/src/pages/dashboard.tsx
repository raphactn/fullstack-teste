import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Task, TaskFormData } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { TaskCard } from "@/components/Tasks/TaskCard";
import { TaskDialog } from "@/components/Tasks/TaskDialog";
import { PiPlus } from "react-icons/pi";

export default function Dashboard() {
  const { user } = useAuth();
  const { tasksQuery, createTask, updateTask, deleteTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  function openCreate() {
    setSelectedTask(null);
    setOpen(true);
  }

  function openEdit(task: Task) {
    setSelectedTask(task);
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
    setSelectedTask(null);
  }

  function handleSubmit(data: TaskFormData) {
    if (!user) return;

    const { endAt, ...rest } = data;

    if (selectedTask) {
      updateTask.mutate({
        id: selectedTask.id,
        task: { ...(endAt && { endAt: new Date(endAt) }), ...rest },
      });
    } else {
      createTask.mutate({
        ...rest,
        userId: user.id,
        ...(endAt && { endAt: new Date(endAt) }),
      });
    }

    closeDialog();
  }

  if (tasksQuery.isLoading) {
    return (
      <Flex h="60vh" align="center" justify="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Box py={10} px={6}>
      {open && (
        <TaskDialog
          open={open}
          task={selectedTask}
          onClose={closeDialog}
          onSubmit={handleSubmit}
          loading={createTask.isPending || updateTask.isPending}
        />
      )}

      <Flex justify="space-between" mb={8}>
        <Heading>Tarefas</Heading>

        <Button colorScheme="blue" onClick={openCreate}>
          <PiPlus /> Adicionar
        </Button>
      </Flex>

      <SimpleGrid gap={4} columns={[1, 2, 3]}>
        {tasksQuery.data?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={openEdit}
            onDelete={() => deleteTask.mutate(task.id)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
