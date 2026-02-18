import { TaskFormData } from "@/types";

export const createTaskDefaults: TaskFormData = {
  title: "",
  description: "",
  status: "PENDING",
  endAt: "",
  userId: "",
};

export const taskStatus = {
  DONE: {
    label: "Concluída",
    colorScheme: "green.700",
  },
  IN_PROGRESS: {
    label: "Em andamento",
    colorScheme: "orange.700",
  },
  PENDING: {
    label: "Pendente",
    colorScheme: "yellow.700",
  },
};
