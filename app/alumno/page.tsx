"use client";

import { useState } from "react";
import FichaAlumno from "@/components/FichaAlumno";
import OfertaCard from "@/components/OfertaCard";
import { X, Heart } from "lucide-react";

const mockAlumnoId = 1;

const mockOfertas = [
  {
    id: 1,
    empresa: "TechNova",
    tipoPracticas: "remuneradas",
    incorporacion: "Julio 2025",
    tareas: "Desarrollo frontend en React, soporte en diseño de interfaces.",
    requisitos: "Conocimientos básicos de React y Tailwind.",
    localizacion: {
      poblacion: "Barcelona",
      distrito: "Eixample",
    },
    puesto: "Frontend Developer Jr.",
  },
  {
    id: 2,
    empresa: "GreenSoft",
    tipoPracticas: "no remuneradas",
    incorporacion: "Septiembre 2025",
    tareas: "Tareas de testing y documentación en proyectos de software libre.",
    requisitos: "Ganas de aprender y nociones de Git.",
    localizacion: {
      poblacion: "València",
      distrito: "Campanar",
    },
    puesto: "QA Intern",
  },
  {
    id: 3,
    empresa: "DataLab",
    tipoPracticas: "remuneradas",
    incorporacion: "Agosto 2025",
    tareas: "Análisis de datos con Python y soporte en visualización.",
    requisitos: "Python básico, interés en ciencia de datos.",
    localizacion: {
      poblacion: "Madrid",
      distrito: "Chamartín",
    },
    puesto: "Data Analyst Intern",
  },
];

const mockMatches = [
  {
    empresa: "Innovatech",
    estado: "Pendiente de entrevista",
  },
];

export default function AlumnoPage() {
  const [tab, setTab] = useState<"datos" | "ofertas" | "matches">("ofertas");
  const [vistas, setVistas] = useState<number[]>([]);
  const [indice, setIndice] = useState(0);
  const [animando, setAnimando] = useState(false); // Estado animación

  const ofertasDisponibles = mockOfertas.filter((o) => !vistas.includes(o.id));
  const ofertaActual = ofertasDisponibles[indice] ?? null;

  function siguiente() {
    if (indice + 1 < ofertasDisponibles.length) {
      setIndice(indice + 1);
    } else {
      setIndice(0);
    }
  }

  function marcarComoVista(id: number) {
    setVistas((prev) => [...prev, id]);
  }

  function onSwipeRight() {
    if (!ofertaActual || animando) return; // Evitar dobles clicks

    setAnimando(true);

    // Duración animación: 2000ms (2 segundos)
    setTimeout(() => {
      alert(`¡Has hecho match con ${ofertaActual.empresa}!`);
      marcarComoVista(ofertaActual.id);
      siguiente();
      setAnimando(false);
    }, 2000);
  }

  function onSwipeLeft() {
    if (!ofertaActual || animando) return;

    marcarComoVista(ofertaActual.id);
    siguiente();
  }

  return (
    <main className="max-w-xl mx-auto h-full bg-[#24396C] text-white px-4 py-2 flex flex-col gap-6">
      {/* Pestañas */}
      <div className="flex justify-around border-b border-[#CCDB42] mb-4">
        {["ofertas", "matches", "datos"].map((key) => (
          <button
            key={key}
            className={`px-4 py-1 ${tab === key ? "border-b-2 border-[#CCDB42]" : ""
              }`}
            onClick={() => setTab(key as typeof tab)}
          >
            {key === "ofertas" && "Ver ofertas"}
            {key === "matches" && "Mis matches"}
            {key === "datos" && "Mis datos"}
          </button>
        ))}
      </div>

      {/* Contenido pestañas */}
      {tab === "ofertas" && (
        <section className="relative flex flex-col flex-1 justify-center items-center h-full">
          {ofertaActual ? (
            <>
              <div
                className={`w-full flex-1 flex items-stretch justify-center
                  transition-transform duration-500
                  ${animando ? "scale-105 border-4 border-green-500 rounded-xl shadow-lg bg-[#1e462c]" : ""}`}
              >
                <OfertaCard
                  oferta={ofertaActual}
                  onSwipeLeft={onSwipeLeft}
                  onSwipeRight={onSwipeRight}
                  // className="h-full w-full"
                />
              </div>

              <div className="absolute bottom-6 flex gap-12 z-20">
                <button
                  onClick={onSwipeLeft}
                  disabled={animando}
                  className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="No me interesa"
                >
                  <X className="w-6 h-6" />
                </button>

                <button
                  onClick={onSwipeRight}
                  disabled={animando}
                  className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Me interesa"
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex-1 flex items-center justify-center">
              <div className="h-full w-full p-8 rounded-xl border border-[#CCDB42] bg-[#2F4A8A] shadow flex items-center justify-center text-center text-lg">
                Ya has visto todas las ofertas disponibles por ahora.
              </div>
            </div>
          )}
        </section>
      )}

      {tab === "matches" && (
        <section className="border border-[#CCDB42] rounded-lg p-5 bg-[#2F4A8A] shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-[#CCDB42]">
            Empresas que te han aceptado
          </h2>

          {mockMatches.length === 0 ? (
            <p>Aún no tienes ningún match.</p>
          ) : (
            <ul className="space-y-4">
              {mockMatches.map((match, i) => (
                <li
                  key={i}
                  className="bg-[#24396C] border border-[#CCDB42] rounded-lg p-4 shadow flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-[#CCDB42]">
                        {match.empresa}
                      </h3>
                      <p className="text-sm italic">{match.estado}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => alert(`Ver oferta de ${match.empresa}`)}
                      className="flex-1 bg-white text-[#24396C] font-semibold py-2 rounded hover:bg-[#CCDB42] hover:text-[#24396C] transition"
                    >
                      Ver oferta
                    </button>

                    <button
                      onClick={() => alert(`Iniciar chat con ${match.empresa}`)}
                      className="flex-1 bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
                    >
                      Iniciar chat
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {tab === "datos" && <FichaAlumno alumnoId={mockAlumnoId} />}
    </main>
  );
}
