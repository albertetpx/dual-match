"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [tipo, setTipo] = useState("alumno");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, email, password })
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/${tipo}`);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full mb-4 p-2 border rounded">
        <option value="alumno">Alumno</option>
        <option value="empresa">Empresa</option>
        <option value="admin">Administrador</option>
      </select>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />
      <button onClick={handleLogin} className="w-full bg-[#24396C] text-white p-2 rounded">Entrar</button>
    </div>
  );
};

export default LoginPage;