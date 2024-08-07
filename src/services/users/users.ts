import User, { UserList } from "../../models/user";
import delay from "../../utils/delay";

export interface UserService {
  createUser: (username: string, password: string) => Promise<number>;
  changeUsername: (
    id: number,
    password: string,
    newUsername: string
  ) => Promise<boolean>;
  changePassword: (
    id: number,
    password: string,
    newPassword: string
  ) => Promise<boolean>;
  deleteUser: (id: number, password: string) => Promise<boolean>;
  logIn: (username: string, password: string) => Promise<number>;
  getUserExists: (id: number) => Promise<boolean>;
}

const SERVER_DELAY = 1;

export class MockUserService implements UserService {
  private static _instance: MockUserService;
  private _users: UserList;
  private _nextId: number;

  constructor() {
    this._nextId = 0;
    // TODO: remove admin user
    this._users = [new User(this._generateId(), "admin", "password")];
  }

  async getUserExists(id: number): Promise<boolean> {
    await delay(SERVER_DELAY);

    const user = this._users.find((user) => user.id === id);
    return !!user;
  }

  static get instance(): UserService {
    MockUserService._instance ??= new MockUserService();
    return MockUserService._instance;
  }

  async changeUsername(_id: number, _password: string, _newUsername: string) {
    return Promise.reject(new Error("Not implemented"));
  }

  async changePassword(_id: number, _password: string, _newPassword: string) {
    return Promise.reject(new Error("Not implemented"));
  }

  async deleteUser(_id: number, _password: string) {
    return Promise.reject(new Error("Not implemented"));
  }

  async createUser(username: string, password: string) {
    await delay(SERVER_DELAY);

    const exists = this._users.find((user) => user.username === username);
    if (exists) {
      throw new Error("Username already exists");
    }

    const id = this._generateId();
    const user = new User(id, username, password);
    this._users.push(user);
    return id;
  }

  async logIn(username: string, password: string) {
    await delay(SERVER_DELAY);

    const user = this._users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      throw new Error("Wrong username or password");
    }

    return user.id as number;
  }

  private _generateId(): number {
    return this._nextId++;
  }
}
