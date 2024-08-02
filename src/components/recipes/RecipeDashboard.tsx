import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import delay from "../../utils/delay";

const RecipeDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      delay(5).then((_) => navigate("/login"));
    }
  });

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
          <p>You will be redirected in 5 seconds...</p>
        </div>
      )}
    </>
  );
};

export default RecipeDashboard;
