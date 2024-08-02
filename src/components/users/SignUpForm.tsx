import clsx from "clsx";
import useUsers from "../../hooks/users/useUsers";
import User, { UserValidator } from "../../models/user";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type ValueTuple<T> = {
  value: T;
  valid?: boolean;
};

const SignUpForm: React.FC = () => {
  /* TODO: add proper feedback */

  const { user, logUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState<ValueTuple<string>>({ value: "" });

  const [password, setPassword] = useState<ValueTuple<string>>({ value: "" });
  const [confirmPassword, setConfirmPassword] = useState<ValueTuple<string>>({
    value: "",
  });

  const { createUser } = useUsers();
  const [waiting, setWaiting] = useState<boolean>(false);
  const [creationFailed, setCreationFailed] = useState<boolean>(false);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, []);

  const onChangeUsername: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((ev) => {
      setUsername((prev) => {
        const newUsername = ev.target.value;
        const tuple: ValueTuple<string> = { value: newUsername };
        if (prev.valid !== undefined) {
          tuple.valid = UserValidator.validateUsername(newUsername);
        }
        return tuple;
      });
    }, []);

  const onBlurUsername: React.FocusEventHandler<HTMLInputElement> = useCallback(
    () =>
      setUsername((prev) => ({
        value: prev.value,
        valid: UserValidator.validateUsername(prev.value),
      })),
    []
  );

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((ev) => {
      setPassword((prev) => {
        const newPassword = ev.target.value;
        const tuple: ValueTuple<string> = { value: newPassword };
        if (prev.valid !== undefined) {
          tuple.valid = UserValidator.validatePassword(newPassword);
        }
        return tuple;
      });
    }, []);

  const onBlurPassword: React.FocusEventHandler<HTMLInputElement> = useCallback(
    () =>
      setPassword((prev) => ({
        value: prev.value,
        valid: UserValidator.validatePassword(prev.value),
      })),
    []
  );

  const onChangeConfirmPassword: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (ev) => {
        setConfirmPassword((prev) => {
          const newConfirmation = ev.target.value;
          const tuple: ValueTuple<string> = { value: newConfirmation };
          if (prev.valid !== undefined) {
            tuple.valid = newConfirmation === password.value;
          }
          return tuple;
        });
      },
      [password]
    );

  const onBlurConfirmPassword: React.FocusEventHandler<HTMLInputElement> =
    useCallback(
      () =>
        setPassword((prev) => ({
          value: prev.value,
          valid: prev.value === password.value,
        })),
      [password]
    );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (ev) => {
      ev.preventDefault();
      if (
        waiting ||
        !username.valid ||
        !password.valid ||
        password.value !== confirmPassword.value
      ) {
        return;
      }

      setWaiting(true);
      createUser(username.value, password.value)
        .then((id) => {
          logUser(new User(id, username.value, ""));
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          setCreationFailed(true);
          setWaiting(false);
        });
    },

    [username, password]
  );

  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        // center on screen
        "m-auto flex flex-col items-center",
        // size and position div children
        "[&>div]:my-2 [&>div]:w-[20rem] [&>div]:flex [&>div]:justify-center [&>div]:items-center",
        // size grandchildren
        "[&>div>*]:w-[10rem]",
        // style inputs
        "[&_input]:py-1 [&_input]:px-2 [&_input]:rounded-md [&_input]:border-2 [&_input]:outline-none",
        // set text
        "text-xl"
      )}
    >
      <div
        className={clsx({
          "[&>input]:border-red [&>input]:text-red":
            username.valid !== undefined && !username.valid,
          "[&_input]:border-primary [&_input]:text-primary": username.valid,
        })}
      >
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={onChangeUsername}
          onBlur={onBlurUsername}
        />
      </div>
      <div
        className={clsx({
          "[&>input]:border-red [&>input]:text-red":
            password.valid !== undefined && !password.valid,
          "[&_input]:border-primary [&_input]:text-primary": password.valid,
        })}
      >
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={onChangePassword}
          onBlur={onBlurPassword}
        />
      </div>
      <div
        className={clsx({
          "[&>input]:border-red [&>input]:text-red":
            confirmPassword.valid !== undefined && !confirmPassword.valid,
          "[&_input]:border-primary [&_input]:text-primary":
            confirmPassword.valid,
        })}
      >
        <label htmlFor="confirmation">Confirm</label>
        <input
          id="confirmation"
          type="password"
          onChange={onChangeConfirmPassword}
          onBlur={onBlurConfirmPassword}
        />
      </div>
      <div
        className={clsx("h-20 text-base text-red", {
          invisible: !creationFailed,
        })}
      >
        Creation failed. Username exists?
      </div>
      <button
        type="submit"
        className={clsx("btn w-32 h-12 font-bold", {
          "border-secondary bg-secondary text-white hover:bg-black hover:border-black":
            !waiting,
          "bg-black border-black text-white": waiting,
        })}
      >
        {waiting ? "..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
