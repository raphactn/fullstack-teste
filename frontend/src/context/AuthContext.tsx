import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Auth, AuthContextType, Register, User } from "@/types";

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get("auth/me");
        setUser(data);
      } catch {
        Cookies.remove("accessToken");
        setUser(null);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (values: Auth) => {
    const { data } = await api.post("/auth/login", values);
    Cookies.set("accessToken", data.accessToken);

    setUser(data.user);
  };

  const register = async (values: Register) => {
    const { data } = await api.post("auth/register", values);
    Cookies.set("accessToken", data.accessToken);

    setUser(data.user);
  };

  const logout = async () => {
    Cookies.remove("accessToken");
    setUser(null);
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
