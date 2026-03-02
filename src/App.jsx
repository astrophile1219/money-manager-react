import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import LandingPage from "./components/LandingPage";
import PageNotFound from "./pages/PageNotFound";


const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token"); // ✅ Auto-clean expired token
      return false;
    }
    return true;
  } catch {
    return !!token; // fallback if token is not JWT
  }
};

const Root = () => {
  return isTokenValid() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/landing" replace />
  );
};

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/income"    element={<ProtectedRoute><Income /></ProtectedRoute>} />
        <Route path="/expense"   element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        <Route path="/category"  element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/filter"    element={<ProtectedRoute><Filter /></ProtectedRoute>} />

        {/* Public Routes */}
        <Route path="/login"   element={<Login />} />
        <Route path="/signup"  element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* ✅ 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;