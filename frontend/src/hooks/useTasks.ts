import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Task, TaskFormData } from "@/types";
import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useTasks() {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await api.get("/tasks");
      return data as Task[];
    },
  });

  const createTask = useMutation({
    mutationFn: (task: TaskFormData) => api.post("/tasks", task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toaster.error({
        title: "Erro",
        description: getErrorMessage(err),
      });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, task }: { id: string; task: TaskFormData }) =>
      api.put(`/tasks/${id}`, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toaster.error({
        title: "Erro",
        description: getErrorMessage(err),
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: string) => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      toaster.error({
        title: "Erro",
        description: getErrorMessage(err),
      });
    },
  });

  return {
    tasksQuery,
    createTask,
    updateTask,
    deleteTask,
  };
}
