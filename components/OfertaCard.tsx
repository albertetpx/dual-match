"use client";
import React, { useRef, useState } from "react";
import clsx from "clsx";

interface Oferta {
  id: number;
  empresa: string;
  tipoPracticas: string;
  incorporacion: string;
  tareas: string;
  requisitos: string;
  localizacion: {
    poblacion: string;
    distrito: string;
  };
  puesto: string;
}

interface OfertaCardProps {
  oferta: Oferta;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function OfertaCard({
  oferta,
  onSwipeLeft,
  onSwipeRight,
}: OfertaCardProps) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [animation, setAnimation] = useState<"left" | "right" | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchEndX.current - touchStartX.current;
      if (diff > 50) {
        setAnimation("right");
        setTimeout(() => {
          onSwipeRight();
          setAnimation(null);
        }, 300);
      } else if (diff < -50) {
        setAnimation("left");
        setTimeout(() => {
          onSwipeLeft();
          setAnimation(null);
        }, 300);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  return (
    <article
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={clsx(
        "w-full max-w-md p-6 bg-[#2F4A8A] border border-[#CCDB42] rounded-lg shadow-lg flex flex-col gap-4 select-none mx-auto transition-all duration-300 ease-in-out",
        {
          "animate-swipe-left": animation === "left",
          "animate-swipe-right": animation === "right",
          "animate-fade-in-up": animation === null,
        }
      )}
    >
      {/* Contenido igual que antes */}
      <div>
        <h3 className="text-3xl font-extrabold text-[#CCDB42] mb-1">
          {oferta.empresa}
        </h3>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            oferta.tipoPracticas === "remuneradas"
              ? "bg-green-600 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {oferta.tipoPracticas === "remuneradas"
            ? "Remuneradas"
            : "No remuneradas"}
        </span>
      </div>

      <div className="text-white">
        <p className="text-xl font-semibold mb-2">{oferta.puesto}</p>

        <p className="mb-1">
          <span className="font-semibold text-[#CCDB42]">Incorporación:</span>{" "}
          {oferta.incorporacion}
        </p>

        <p className="mb-1">
          <span className="font-semibold text-[#CCDB42]">Localización:</span>{" "}
          {oferta.localizacion.poblacion}, {oferta.localizacion.distrito}
        </p>

        <div className="mb-2">
          <p className="font-semibold text-[#CCDB42]">Tareas:</p>
          <p className="ml-2 text-gray-200">{oferta.tareas}</p>
        </div>

        <div>
          <p className="font-semibold text-[#CCDB42]">Requisitos:</p>
          <p className="ml-2 text-gray-200">{oferta.requisitos}</p>
        </div>
      </div>
    </article>
  );
}
