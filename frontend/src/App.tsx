import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/non-authenticated/Home";
import Login from "./pages/non-authenticated/Login";
import Register from "./pages/non-authenticated/Register";
import ForgottenPassword from "./pages/non-authenticated/ForgottenPassword";
import Dashboard from "./pages/authenticated/Dashboard";
import Profile from "./pages/authenticated/Profile";
import { AuthProvider } from "./context/AuthContext";
import { AuthenticatedLayout } from "./components/auth/AuthenticatedLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotten-password" element={<ForgottenPassword />} />
          <Route
            path="/dashboard"
            element={
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthenticatedLayout>
                <Profile />
              </AuthenticatedLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
