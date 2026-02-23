import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom"
import "../styles/register.css";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("CLIENTE")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        nome,
        email,
        senha,
        role: "CLIENTE",
      });

      alert("Cadastro realizado!");
      window.location.href = "/login"
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar");
    }
  }

  return (
     <div className="register-page">
           <div className="register-box">
             <h1 className="register-title">Criar Perfil</h1>

             <form onSubmit={handleRegister}>
               <div className="register-grid">
                 <div className="register-field full-width">
                   <label>NOME</label>
                   <input
                     type="text"
                     placeholder="Ex: David Martinez"
                     onChange={(e) => setFormData({...formData, nome: e.target.value})}
                     required
                   />
                 </div>

                 <div className="register-field full-width">
                   <label>ENDEREÇO DE EMAIL</label>
                   <input
                     type="email"
                     placeholder="david@edgerunners.com"
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     required
                   />
                 </div>

                 <div className="register-field">
                   <label>SENHA</label>
                   <input
                     type="password"
                     placeholder="********"
                     onChange={(e) => setFormData({...formData, password: e.target.value})}
                     required
                   />
                 </div>

               </div>

               <button type="submit" className="register-btn">
                 CRIAR
               </button>
             </form>

             <div className="register-footer">
               JÁ ESTÁ NA REDE? <Link to="/login">FAZER LOGIN</Link>
             </div>
           </div>
         </div>
       );
}

export default Register;