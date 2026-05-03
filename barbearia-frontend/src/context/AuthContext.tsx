import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Role = "ADMIN" | "CLIENTE" | "BARBEIRO";

type AuthUser = {
  token: string;
  role: Role;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function getInitialUser(): AuthUser | null {
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role") as Role | null;
  if (token && role) return { token, role };
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  const login = useCallback((token: string, rawRole: string) => {
    // Normaliza: remove prefixo "ROLE_" se existir
    const role = rawRole.replace("ROLE_", "").toUpperCase() as Role;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setUser({ token, role });
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
  }, []);

  return (
      <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}