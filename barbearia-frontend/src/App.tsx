import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Barbers from "./pages/Barbers";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
          <nav className="navbar">
            <h1> Barbearia</h1>

            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Cadastrar</Link>
            </div>
          </nav>

          <Routes>
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
              />
          </Routes>
        </div>
  );
}

export default App;