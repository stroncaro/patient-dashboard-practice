import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./components/AppContent";
import Header from "./components/Header";
import LogInForm from "./components/users/LogInForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
