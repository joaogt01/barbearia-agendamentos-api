import { api } from "../api/api";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    api.get("/barbers").then((res) => console.log(res.data));
  }, []);

  return <h1>Dashboard logado 🔐</h1>;
}
