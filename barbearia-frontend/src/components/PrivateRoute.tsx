import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

type Props = {
    children: ReactNode;
    role?: "ADMIN" | "CLIENTE" | "BARBEIRO";
};

export default function PrivateRoute({ children, role }: Props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}