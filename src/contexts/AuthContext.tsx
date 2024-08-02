import { createContext, PropsWithChildren, useCallback, useState } from "react";

interface AuthContextProps {
  userId: number | null;
  setUserId: (id: number) => void;
  resetUserId: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userId: null,
  setUserId: () => {
    throw new Error("Context not initialized");
  },
  resetUserId: () => {
    throw new Error("Context not initialized");
  },
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userId, _setUserId] = useState<number | null>(null);
  const setUserId = useCallback((id: number) => _setUserId(id), []);
  const resetUserId = useCallback(() => {
    _setUserId(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId, resetUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
