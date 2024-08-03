import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LogInForm from "./components/users/LogInForm";
import SignUpForm from "./components/users/SignUpForm";
import RecipeDashboard from "./components/recipes/RecipeDashboard";
import PatientDashboard from "./components/patients/PatientDashboard";
import MainLayout from "./components/MainLayout";
import Landing from "./components/Landing";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
            <Route path="patients" element={<PatientDashboard />} />
            <Route path="recipes" element={<RecipeDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
