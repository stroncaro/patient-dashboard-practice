import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const RecipeDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <div>
          {/* TODO */}
          Recipe Dashboard
        </div>
      ) : (
        <div className="m-4">
          <h1 className="text-2xl font-bold">Error: content not accessible</h1>
          <p>Must be logged in</p>
        </div>
      )}
    </>
  );
};

export default RecipeDashboard;
