import { useCallback, useState } from "react";
import {
  UserService,
  MockUserService as UserServiceImplementation,
} from "../../services/users/users";
import { UserValidator } from "../../models/user";

interface UsersHook {
  userId: number | null;
  createUser: (username: string, password: string) => Promise<boolean>;
  logIn: (username: string, password: string) => Promise<boolean>;
  logOut: () => Promise<boolean>;
}

const useUsers: () => UsersHook = () => {
  const service = UserServiceImplementation.instance as UserService;
  const [userId, setUserId] = useState<number | null>(null);

  const createUser = useCallback(async (username: string, password: string) => {
    if (
      !UserValidator.validateUsername(username) ||
      !UserValidator.validatePassword(password)
    ) {
      return false;
    }

    try {
      const id = await service.createUser(username, password);
      setUserId(id);
    } catch (error) {
      return false;
    }

    return true;
  }, []);

  const logIn = useCallback(async (username: string, password: string) => {
    const service = UserServiceImplementation.instance as UserService;

    try {
      const id = await service.logIn(username, password);
      setUserId(id);
    } catch (error) {
      return false;
    }

    return true;
  }, []);

  const logOut = useCallback(async () => {
    setUserId(null);
    return true;
  }, []);

  return { userId, createUser, logIn, logOut };
};

export default useUsers;
