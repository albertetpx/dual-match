"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";

export default function Header() {
  function handleLogout() {
    alert("Cerrar sesión");
    // Aquí la lógica real de logout
  }

  return (
    <header className="bg-[#24396C] text-[#CCDB42] shadow-md">
      <div className="flex items-center justify-between px-4 py-3 max-w-xl mx-auto relative">
        {/* Logo PNG a la izquierda */}
        <div className="flex items-center gap-2 font-bold select-none z-10">
          <Image
            src="/images/logo.png"
            alt="Logo MatchPrácticas"
            width={24}
            height={24}
            priority
          />
        </div>

        {/* Título centrado absoluto */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg select-none pointer-events-none">
          TinkDUAL
        </div>

        {/* Botón Logout a la derecha */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#CCDB42] text-[#24396C] px-3 py-1 rounded font-semibold hover:bg-[#b4c731] transition z-10"
          aria-label="Cerrar sesión"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
