import { createContext, PropsWithChildren, useCallback, useState } from "react";
import User from "../models/user";

interface AuthContextProps {
  user: User | null;
  logUser: (user: User) => void;
  logOutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  logUser: () => {
    throw new Error("Context not initialized");
  },
  logOutUser: () => {
    throw new Error("Context not initialized");
  },
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const logUser = useCallback((user: User) => setUser(user), []);
  const logOutUser = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        logUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
