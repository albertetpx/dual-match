"use client";

import { useState } from "react";
import FichaAlumno from "@/components/FichaAlumno";
import OfertaCard from "@/components/OfertaCard";
import { X, Heart } from "lucide-react";

const mockAlumnoId = 1;

const mockOfertas = [
  {
    id: 1,
    empresa: "Innovatech",
    puesto: "Desarrollador Frontend Junior",
    tipoPracticas: "remuneradas",
    incorporacion: "Septiembre 2025",
    tareas:
      "Desarrollo de interfaces con React y mantenimiento de componentes UI.",
    requisitos: "Conocimientos básicos de React, CSS y JavaScript.",
    localizacion: {
      poblacion: "Barcelona",
      distrito: "Eixample",
    },
  },
  {
    id: 2,
    empresa: "DataSolve",
    puesto: "Prácticas en análisis de datos",
    tipoPracticas: "no remuneradas",
    incorporacion: "Octubre 2025",
    tareas:
      "Análisis de grandes conjuntos de datos y creación de informes visuales.",
    requisitos: "Conocimientos en estadística y manejo de Python.",
    localizacion: {
      poblacion: "Madrid",
      distrito: "Salamanca",
    },
  },
];


const mockMatches = [
  {
    empresa: "Innovatech",
    estado: "Pendiente de entrevista",
  },
];

export default function AlumnoPage() {
  const [tab, setTab] = useState<"datos" | "ofertas" | "matches">("datos");
  const [ofertas] = useState(mockOfertas);
  const [indice, setIndice] = useState(0);

  function siguiente() {
    setIndice((i) => (i + 1 < ofertas.length ? i + 1 : 0));
  }

  function onSwipeRight() {
    alert(`¡Has hecho match con ${ofertas[indice].empresa}!`);
    siguiente();
  }

  function onSwipeLeft() {
    siguiente();
  }

  return (
    <main className="max-w-xl mx-auto min-h-screen bg-[#24396C] text-white px-4 py-6 flex flex-col gap-6">
      {/* Pestañas */}
      <div className="flex justify-around border-b border-[#CCDB42] mb-4">
        {["datos", "ofertas", "matches"].map((key) => (
          <button
            key={key}
            className={`px-4 py-2 ${
              tab === key ? "border-b-2 border-[#CCDB42]" : ""
            }`}
            onClick={() => setTab(key as typeof tab)}
          >
            {key === "datos" && "Mis datos"}
            {key === "ofertas" && "Ver ofertas"}
            {key === "matches" && "Mis matches"}
          </button>
        ))}
      </div>

      {/* Contenido de pestañas */}
      {tab === "datos" && <FichaAlumno alumnoId={mockAlumnoId} />}

      {tab === "ofertas" && ofertas.length > 0 && (
        <section className="flex flex-col justify-center items-center border border-[#CCDB42] rounded-lg p-8 bg-[#2F4A8A] shadow-lg min-h-[60vh]">
          <h2 className="text-2xl font-semibold mb-6 text-[#CCDB42]">
            Oferta {indice + 1} de {ofertas.length}
          </h2>

          <OfertaCard
            oferta={ofertas[indice]}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
          />

          <div className="flex justify-between gap-6 mt-8 w-full max-w-3xl">
            <button
              onClick={onSwipeLeft}
              className="flex-1 py-4 flex justify-center items-center bg-white text-red-600 font-bold rounded-lg hover:bg-red-100 transition"
              aria-label="No me interesa"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              onClick={onSwipeRight}
              className="flex-1 py-4 flex justify-center items-center bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
              aria-label="Me interesa"
            >
              <Heart className="w-7 h-7" />
            </button>
          </div>
        </section>
      )}

     {tab === "matches" && (
  <section className="border border-[#CCDB42] rounded-lg p-5 bg-[#2F4A8A] shadow-lg">
    <h2 className="text-xl font-bold mb-4 text-[#CCDB42]">Empresas que te han aceptado</h2>

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
                <h3 className="text-lg font-semibold text-[#CCDB42]">{match.empresa}</h3>
                <p className="text-sm italic">{match.estado}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <button
                onClick={() => alert(`Ver oferta de ${match.empresa}`)} // Sustituye por router.push si tienes la ruta
                className="flex-1 bg-white text-[#24396C] font-semibold py-2 rounded hover:bg-[#CCDB42] hover:text-[#24396C] transition"
              >
                Ver oferta
              </button>

              <button
                onClick={() => alert(`Iniciar chat con ${match.empresa}`)} // Sustituye por router.push si tienes la ruta
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

    </main>
  );
}
