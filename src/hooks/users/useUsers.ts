import {
  UserService,
  MockUserService as UserServiceImplementation,
} from "../../services/users/users";
import { UserValidator } from "../../models/user";

interface UsersHook {
  createUser: (username: string, password: string) => Promise<number>;
  logIn: (username: string, password: string) => Promise<number>;
}

const useUsers: () => UsersHook = () => {
  const service = UserServiceImplementation.instance as UserService;

  const createUser = async (username: string, password: string) => {
    if (
      !UserValidator.validateUsername(username) ||
      !UserValidator.validatePassword(password)
    ) {
      throw new Error("Invalid username and/or password");
    }

    try {
      const id = await service.createUser(username, password);
      return id;
    } catch (error) {
      throw error;
    }
  };

  const logIn = async (username: string, password: string) => {
    try {
      const id = await service.logIn(username, password);
      return id;
    } catch (error) {
      throw error;
    }
  };

  return { createUser, logIn };
};

export default useUsers;
