import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/users/useUsers";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const { logOut } = useUsers();

  return (
    <header className="flex justify-between items-center p-6 bg-primary text-white">
      <div className="flex items-baseline text-2xl font-bold gap-1 underline">
        <div className="flex justify-center items-center size-8 p-2 rounded-full font-black bg-white text-primary">
          S
        </div>
        SuperSoft
      </div>
      <ul className="flex items-center gap-4 font-bold">
        {!userId ? (
          <>
            <li>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-xl btn-primary"
              >
                Log In
              </button>
            </li>
            <li>
              <button
                /* onClick={logIn} */ className="btn btn-xl btn-highlight"
              >
                Sign up
              </button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={logOut} className="btn btn-xl btn-primary">
              Log out
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
