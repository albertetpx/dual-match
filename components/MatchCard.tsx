// /components/MatchCard.tsx
"use client";
import React from "react";

interface MatchCardProps {
  empresa: string;
  onVerOferta: () => void;
  onIniciarChat: () => void;
}

export default function MatchCard({
  empresa,
  onVerOferta,
  onIniciarChat,
}: MatchCardProps) {
  return (
    <div className="bg-[#2F4A8A] rounded-xl p-6 shadow-lg flex justify-between items-center mb-4 max-w-2xl mx-auto border border-[#CCDB42]">
      <div>
        <h3 className="text-xl font-bold text-[#CCDB42]">{empresa}</h3>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onVerOferta}
          className="bg-[#CCDB42] text-[#24396C] font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          Ver oferta
        </button>
        <button
          onClick={onIniciarChat}
          className="bg-[#24396C] text-[#CCDB42] font-semibold px-4 py-2 border border-[#CCDB42] rounded hover:bg-[#1f3a6f] transition"
        >
          Iniciar chat
        </button>
      </div>
    </div>
  );
}
