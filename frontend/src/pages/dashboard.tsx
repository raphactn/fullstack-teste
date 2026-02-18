import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  SimpleGrid,
  Input,
  InputGroup,
  CloseButton,
  Text,
  Center,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Task, TaskFormData } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { TaskCard } from "@/components/Tasks/TaskCard";
import { TaskDialog } from "@/components/Tasks/TaskDialog";
import { PiPlus } from "react-icons/pi";
import { useDebounce } from "use-debounce";
import { LuNotebookPen, LuSearch } from "react-icons/lu";

export default function Dashboard() {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 400);

  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    setPage(1);
  }, [searchDebounce]);

  const { tasksQuery, createTask, updateTask, deleteTask } = useTasks({
    search: searchDebounce,
    page,
    limit,
  });

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

  const endElement = search ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setSearch("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  if (tasksQuery.isLoading && !tasksQuery.data) {
    return (
      <Flex h="60vh" align="center" justify="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  const tasks = tasksQuery.data?.data ?? [];
  const meta = tasksQuery.data?.meta;

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

      <Flex
        justify="space-between"
        flexDir={{ base: "column", md: "row" }}
        align="center"
        mb={8}
        gap={5}
      >
        <Heading>Minhas Tarefas</Heading>

        <Flex gap={2} align="center">
          <InputGroup
            flex="1"
            startElement={<LuSearch />}
            endElement={endElement}
          >
            <Input
              ref={inputRef}
              placeholder="Buscar tarefas"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <Button colorScheme="blue" onClick={openCreate}>
            <PiPlus />
            Adicionar
          </Button>
        </Flex>
      </Flex>

      {!tasks.length && (
        <Center
          p={16}
          borderWidth={2}
          borderStyle="dashed"
          flexDir="column"
          color={"gray.400"}
          bg={"Background"}
          rounded={"md"}
          mt={50}
          gap={5}
        >
          <LuNotebookPen size={60} />
          <Heading>Nenhuma tarefa encontrada</Heading>
        </Center>
      )}

      <SimpleGrid gap={4} columns={{ base: 1, lg: 2, xl: 3 }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={openEdit}
            onDelete={() => deleteTask.mutate(task.id)}
          />
        ))}
      </SimpleGrid>

      {meta && meta.totalPages > 1 && (
        <Flex mt={10} justify="center" align="center" gap={4}>
          <Button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            variant="outline"
          >
            Anterior
          </Button>

          <Text>
            Página {meta.page} de {meta.totalPages}
          </Text>

          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={!meta.hasNextPage}
            variant="outline"
          >
            Próxima
          </Button>
        </Flex>
      )}
    </Box>
  );
}
