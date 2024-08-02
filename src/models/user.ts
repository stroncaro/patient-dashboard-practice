export interface IUser {
  readonly id: number | null;
  readonly username: string;
  readonly password: string;

  validateId: () => boolean;
  validateUsername: () => boolean;
  validatePassword: () => boolean;
  isValid: () => boolean;
}

export default class User implements IUser {
  readonly id: number | null;
  readonly username: string;
  readonly password: string;

  constructor(id: number | null, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  validateId() {
    return UserValidator.validateId(this.id);
  }

  validateUsername() {
    return UserValidator.validateUsername(this.username);
  }

  validatePassword() {
    return UserValidator.validatePassword(this.password);
  }

  isValid() {
    return (
      this.validateId() && this.validatePassword() && this.validateUsername()
    );
  }
}

export type UserList = User[];

export class UserValidator {
  static validateId(id: number | null) {
    return !!id && id >= 0;
  }

  static validateUsername(username: string) {
    return /^[a-zA-Z1-9._\-]/g.test(username) && username.length > 3;
  }

  static validatePassword(password: string) {
    return password.length > 8;
  }

  static validateUser(user: User) {
    return (
      UserValidator.validateId(user.id) &&
      UserValidator.validateUsername(user.username) &&
      UserValidator.validatePassword(user.password)
    );
  }
}
