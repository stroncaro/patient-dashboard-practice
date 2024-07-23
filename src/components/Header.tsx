import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Header: React.FC = () => {
  const { isLoggedIn, logIn, logOut } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center p-4 bg-green-500 text-white">
      <div className="flex items-baseline text-2xl font-bold gap-1 underline">
        <div className="bg-white text-green-500 p-2 rounded-full size-8 flex justify-center items-center">S</div>
        SuperSoft
      </div>
      <ul className="flex items-center gap-4 font-bold">
        {!isLoggedIn ? (
          <>
            <li>
              <button
                onClick={logIn}
                className=
                  "border rounded w-24 h-10"
              >
                Log In
              </button>
            </li>
            <li>
              <button
                onClick={logIn}
                className=
                  "border rounded w-24 h-10 bg-blue-600"
              >
                Sign up
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={logOut}
              className=
                "border rounded w-24 h-10"
            >
              Log out
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
