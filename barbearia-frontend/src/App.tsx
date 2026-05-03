import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login              from "./pages/Login";
import Register           from "./pages/Register";
import PrivateRoute       from "./components/PrivateRoute";
import DashboardAdmin     from "./pages/DashboardAdmin";
import DashboardClient    from "./pages/DashboardClient";
import { DashboardBarber }     from "./pages/DashboardBarber";
import { BarberScheduleToday } from "./pages/BarberScheduleToday";
import AdminServices      from "./pages/AdminServices";
import AdminBarberForm    from "./components/AdminBarberForm";

export default function App() {
    const { isAuthenticated, user } = useAuth();

    const defaultRedirect = () => {
        if (!isAuthenticated) return "/login";
        if (user?.role === "ADMIN")    return "/dashboard-admin";
        if (user?.role === "BARBEIRO") return "/dashboard-barber";
        return "/dashboard-client";
    };

    return (
        <Routes>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

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

            <Route
                path="/dashboard-barber"
                element={
                    <PrivateRoute role="BARBEIRO">
                        <DashboardBarber />
                    </PrivateRoute>
                }
            />
            <Route
                path="/barber-schedule"
                element={
                    <PrivateRoute role="BARBEIRO">
                        <BarberScheduleToday />
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

            <Route path="/"  element={<Navigate to={defaultRedirect()} replace />} />
            <Route path="*"  element={<Navigate to={defaultRedirect()} replace />} />
        </Routes>
    );
}