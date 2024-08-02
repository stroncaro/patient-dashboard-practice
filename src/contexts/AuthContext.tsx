import { createContext, PropsWithChildren } from "react";
import useUsers from "../hooks/users/useUsers";

interface AuthContextProps {
  userId: number | null;
}

export const AuthContext = createContext<AuthContextProps>({
  userId: null,
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useUsers();

  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
};
