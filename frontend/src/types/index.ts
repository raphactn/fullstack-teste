export type Task = {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
  endAt?: Date | string;
  userId: string;
};

export type TaskFormData = Omit<Task, "id" | "createdAt">;

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Auth = { email: string; password: string };

export type Register = { name: string; email: string; password: string };

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: Auth) => Promise<void>;
  register: (data: Register) => Promise<void>;
  logout: () => Promise<void>;
};
