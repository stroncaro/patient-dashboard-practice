import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center p-6 bg-primary text-white">
      <div className="flex items-baseline text-2xl font-bold gap-1 underline">
        <div className="flex justify-center items-center size-8 p-2 rounded-full font-black bg-white text-primary">
          S
        </div>
        SuperSoft
      </div>
      <ul className="flex items-center gap-4 font-bold">
        {user ? (
          <li className="flex items-center justify-end gap-8">
            <p className="text-xl">Welcome, {user.username}</p>
            <button onClick={logOutUser} className="btn btn-xl btn-primary">
              Log out
            </button>
          </li>
        ) : (
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
                onClick={() => navigate("/signup")}
                className="btn btn-xl btn-highlight"
              >
                Sign up
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
