import { createContext, PropsWithChildren, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  logIn: () => { },
  logOut: () => { },
});

/* TODO: Refactor to a service */
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /* TODO: Create actual log in functionality */
  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
