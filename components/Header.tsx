"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#24396C] text-[#CCDB42] shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-xl">🎓</span>
          <span>MatchPrácticas</span>
        </div>

        <button
          className="md:hidden text-[#CCDB42] focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <nav
        className={`md:flex md:items-center md:justify-center md:gap-8 text-sm px-4 pb-3 md:pb-0 ${
          open ? "block" : "hidden"
        } md:block`}
      >
        <Link href="/" className="block py-2 hover:underline">
          Inicio
        </Link>
        <Link href="/alumno" className="block py-2 hover:underline">
          Alumno
        </Link>
        <Link href="/empresa" className="block py-2 hover:underline">
          Empresa
        </Link>
        <Link href="/admin" className="block py-2 hover:underline">
          Admin
        </Link>
      </nav>
    </header>
  );
}
