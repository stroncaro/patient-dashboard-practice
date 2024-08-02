import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./components/AppContent";
import Header from "./components/Header";
import LogInForm from "./components/users/LogInForm";
import SignUpForm from "./components/users/SignUpForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<p>404: Not Found</p>} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <AppContent />
              </>
            }
          />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
