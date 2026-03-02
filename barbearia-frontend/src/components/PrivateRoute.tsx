import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type PrivateRouteProps = {
    children: ReactNode;
    role?: "ADMIN" | "CLIENTE" | "BARBEIRO";
    };

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) return <Navigate to="/login" />

  return <>{children}</>;
}
