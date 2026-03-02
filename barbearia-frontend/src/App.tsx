import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Barbers from "./pages/Barbers";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardClient from "./pages/DashboardClient";
import { DashboardBarber } from "./pages/DashboardBarber";
import AdminBarberForm from "./components/AdminBarberForm";
import AdminServices from "./pages/AdminServices";


function App() {
  return (
         <Routes>
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/dashboard-barber" element={<PrivateRoute role="BARBEIRO"><DashboardBarber /></PrivateRoute>} />

           <Route
                   path="/admin/servicos"
                   element={
                     <PrivateRoute role="ADMIN">
                       <AdminServices />
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
             path="/admin/cadastrar-barbeiro"
             element={
               <PrivateRoute role="ADMIN">
                 <AdminBarberForm />
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
             path="/dashboard-client"
             element={
               <PrivateRoute role="CLIENTE">
                 <DashboardClient />
               </PrivateRoute>
             }
           />

           <Route path="*" element={<Login />} />
         </Routes>
     );
}

export default App;