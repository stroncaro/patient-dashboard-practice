import { AuthProvider } from './contexts/AuthContext';
import AppContent from './components/AppContent';
import Header from './components/Header';


function App() {
  return (
    <AuthProvider>
      <Header />
      <AppContent />
    </AuthProvider>
  )
}

export default App
