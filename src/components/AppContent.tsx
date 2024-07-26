import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PatientDashboard from "./patients/PatientDashboard";

export const AppContent: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main className="flex-grow flex justify-center items-start p-6">
      {isLoggedIn
        ? <PatientDashboard />
        : <p className="self-center text-2xl fade-into-place">Please log in</p>}
    </main>
  );
};

export default AppContent;
