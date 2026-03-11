import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardClient from "./pages/DashboardClient";
import { DashboardBarber } from "./pages/DashboardBarber";
import AdminBarberForm from "./components/AdminBarberForm";
import AdminServices from "./pages/AdminServices";
import Navbar from "./components/AdminNavbar";

function App() {
  const userRole = localStorage.getItem("role")?.toUpperCase();
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard-barber"
          element={
            <PrivateRoute role="BARBEIRO">
              <DashboardBarber />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard-client"
          element={
            <PrivateRoute role="CLIENTE">
              <DashboardClient />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard-admin"
          element={
            <PrivateRoute role="ADMIN">
              <DashboardAdmin />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/servicos"
          element={
            <PrivateRoute role="ADMIN">
              <AdminServices />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/cadastrar-barbeiro"
          element={
            <PrivateRoute role="ADMIN">
              <AdminBarberForm />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;