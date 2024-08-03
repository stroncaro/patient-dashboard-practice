import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Landing: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-1/2">
      <div className="my-4">
        <h1 className="text-3xl font-bold">Patient sytem</h1>
        <hr />
      </div>
      <ul>
        <li>
          <Link to="/patients">Patient Dashboard</Link>
        </li>
        <li>
          <Link
            to="/recipes"
            className={clsx({
              "pointer-events-none cursor-not-allowed": !user,
            })}
          >
            <span className={clsx({ "line-through": !user })}>Recipes </span>
            {!user && (
              <span className="italic text-xs text-[#666]">
                (requires sign in)
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Landing;
