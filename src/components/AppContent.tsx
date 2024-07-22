import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PatientDashboard from "./PatientDashboard/PatientDashboard";

export const AppContent: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    isLoggedIn
      ? <PatientDashboard />
      : <p>Please log in</p>
  );
};

export default AppContent;
