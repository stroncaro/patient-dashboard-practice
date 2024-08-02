import clsx from "clsx";
import useUsers from "../../hooks/users/useUsers";
import { UserValidator } from "../../models/user";
import { useCallback, useState } from "react";

type ValueTuple<T> = {
  value: T;
  validity?: boolean;
};

const UserForm: React.FC = () => {
  const [username, setUsername] = useState<ValueTuple<string>>({ value: "" });
  const [password, setPassword] = useState<ValueTuple<string>>({ value: "" });
  const [invalidCombination, setInvalidCombination] = useState<boolean>(false);
  const { logIn } = useUsers();

  const onChangeUsername: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((ev) => {
      setUsername((prev) => {
        const newUsername = ev.target.value;
        prev.value = newUsername;
        if (prev.validity !== undefined) {
          prev.validity = UserValidator.validateUsername(newUsername);
        }
        return prev;
      });
    }, []);

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((ev) => {
      setPassword((prev) => {
        const newPassword = ev.target.value;
        prev.value = newPassword;
        if (prev.validity !== undefined) {
          prev.validity = UserValidator.validatePassword(newPassword);
        }
        return prev;
      });
    }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (ev) => {
      ev.preventDefault();
      if (
        UserValidator.validateUsername(username.value) &&
        UserValidator.validatePassword(password.value)
      ) {
        logIn(username.value, password.value).then((success) => {
          if (!success) {
            setInvalidCombination(true);
          }
        });
      }
    },
    [username, password]
  );
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={onChangeUsername} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={onChangePassword} />
      </div>
      <div
        className={clsx({
          invisible: invalidCombination,
        })}
      >
        <p>Invalid username/password combination!</p>
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default UserForm;
