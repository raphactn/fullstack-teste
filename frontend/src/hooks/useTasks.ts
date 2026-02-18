import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Task, TaskFormData } from "@/types";
import { toaster } from "@/components/ui/toaster";
import { getErrorMessage } from "@/utils/getErrorMessage";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
};

type TasksResponse = {
  data: Task[];
  meta: PaginationMeta;
};

type TasksParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export function useTasks(params?: TasksParams) {
  const queryClient = useQueryClient();

  const tasksKeys = {
    all: ["tasks"] as const,
    list: (params?: TasksParams) => ["tasks", params] as const,
  };

  const tasksQuery = useQuery({
    queryKey: tasksKeys.list(params),
    queryFn: async () => {
      const { data } = await api.get<TasksResponse>("/tasks", {
        params,
      });

      return data;
    },

    placeholderData: (previous) => previous,
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
