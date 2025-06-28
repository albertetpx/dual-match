"use client";

import { useEffect, useState } from "react";

type Alumno = {
  id: number;
  nombre: string;
  añoNacimiento: number;
  ciclo: string;
  curso: string;
  añoEscolar: string;
  intereses: string[];
  habilidades: string[];
  buscandoPracticas: boolean;
  cvUrl: string | null;
};

export default function FichaAlumno({ alumnoId }: { alumnoId: number }) {
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buscandoPracticas, setBuscandoPracticas] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Estados para edición
  const [editNombre, setEditNombre] = useState("");
  const [editAñoNacimiento, setEditAñoNacimiento] = useState("");
  const [editCiclo, setEditCiclo] = useState("");
  const [editCurso, setEditCurso] = useState("");
  const [editAñoEscolar, setEditAñoEscolar] = useState("");
  const [editIntereses, setEditIntereses] = useState<string>("");
  const [editHabilidades, setEditHabilidades] = useState<string>("");

  useEffect(() => {
    async function fetchAlumno() {
      setLoading(true);
      try {
        const res = await fetch(`/api/alumno/${alumnoId}`);
        if (!res.ok) throw new Error("Error al cargar los datos");
        const data: Alumno = await res.json();
        setAlumno(data);
        setBuscandoPracticas(data.buscandoPracticas);

        // Inicializar estados edición
        setEditNombre(data.nombre);
        setEditAñoNacimiento(String(data.añoNacimiento));
        setEditCiclo(data.ciclo);
        setEditCurso(data.curso);
        setEditAñoEscolar(data.añoEscolar);
        setEditIntereses(data.intereses.join(", "));
        setEditHabilidades(data.habilidades.join(", "));
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchAlumno();
  }, [alumnoId]);

  function toggleBuscando() {
    if (!editMode) return; // solo se puede cambiar en modo edición
    setBuscandoPracticas((prev) => !prev);
  }

  async function guardarCambios() {
    // Aquí pondrías la llamada a API para guardar datos
    // Simulo actualización local:
    setAlumno({
      id: alumnoId,
      nombre: editNombre,
      añoNacimiento: Number(editAñoNacimiento),
      ciclo: editCiclo,
      curso: editCurso,
      añoEscolar: editAñoEscolar,
      intereses: editIntereses.split(",").map((i) => i.trim()).filter(Boolean),
      habilidades: editHabilidades.split(",").map((h) => h.trim()).filter(Boolean),
      buscandoPracticas,
      cvUrl: alumno?.cvUrl || null,
    });
    setEditMode(false);
  }

  if (loading) return <p>Cargando datos del alumno...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!alumno) return <p>No se encontró el alumno.</p>;

  return (
    <div className="border border-[#CCDB42] rounded-lg p-6 bg-[#2F4A8A] shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-[#CCDB42]">
          {editMode ? (
            <input
              type="text"
              value={editNombre}
              onChange={(e) => setEditNombre(e.target.value)}
              className="w-full bg-[#1f3a6f] text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#CCDB42]"
            />
          ) : (
            alumno.nombre
          )}
        </h1>
        {editMode ? (
          <button
            onClick={guardarCambios}
            className="bg-[#CCDB42] text-[#24396C] font-bold px-4 py-1 rounded hover:bg-yellow-300 transition"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-[#CCDB42] text-[#24396C] font-bold px-4 py-1 rounded hover:bg-yellow-300 transition"
          >
            Editar
          </button>
        )}
      </div>

      <div className="mb-4 space-y-2">
        <LabelDatoEditable
          etiqueta="Año nacimiento"
          valor={editAñoNacimiento}
          setValor={setEditAñoNacimiento}
          editable={editMode}
          tipo="number"
        />
        <LabelDatoEditable etiqueta="Ciclo" valor={editCiclo} setValor={setEditCiclo} editable={editMode} />
        <LabelDatoEditable etiqueta="Curso" valor={editCurso} setValor={setEditCurso} editable={editMode} />
        <LabelDatoEditable etiqueta="Año escolar" valor={editAñoEscolar} setValor={setEditAñoEscolar} editable={editMode} />
      </div>

      <div className="mb-4">
        <EtiquetasListaEditable
          etiqueta="Intereses"
          valor={editIntereses}
          setValor={setEditIntereses}
          editable={editMode}
        />
      </div>

      <div className="mb-6">
        <EtiquetasListaEditable
          etiqueta="Habilidades"
          valor={editHabilidades}
          setValor={setEditHabilidades}
          editable={editMode}
        />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <span className="font-semibold text-[#CCDB42] text-lg select-none">
          Buscando prácticas
        </span>
        <label
          htmlFor="buscandoPracticasSwitch"
          className={`relative inline-flex items-center cursor-pointer ${editMode ? "" : "pointer-events-none opacity-70"}`}
        >
          <input
            type="checkbox"
            id="buscandoPracticasSwitch"
            className="sr-only peer"
            checked={buscandoPracticas}
            onChange={toggleBuscando}
            disabled={!editMode}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#CCDB42] rounded-full peer peer-checked:bg-[#CCDB42] transition-colors"></div>
          <div
            className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"
          ></div>
        </label>
      </div>

      <div>
        <span className="font-semibold text-[#CCDB42]">CV:</span>{" "}
        {alumno.cvUrl ? (
          <a
            href={alumno.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#CCDB42] underline hover:text-yellow-300 transition"
          >
            Ver PDF
          </a>
        ) : (
          <span className="italic text-gray-300">No hay CV adjunto.</span>
        )}
      </div>
    </div>
  );
}

function LabelDatoEditable({
  etiqueta,
  valor,
  setValor,
  editable,
  tipo = "text",
}: {
  etiqueta: string;
  valor: string;
  setValor: (v: string) => void;
  editable: boolean;
  tipo?: string;
}) {
  return (
    <p className="flex gap-2 text-white text-lg items-center">
      <span className="font-semibold text-[#CCDB42] w-44">{etiqueta}:</span>
      {editable ? (
        <input
          type={tipo}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="bg-[#1f3a6f] text-white rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#CCDB42]"
        />
      ) : (
        <span className="text-gray-200">{valor}</span>
      )}
    </p>
  );
}

function EtiquetasListaEditable({
  etiqueta,
  valor,
  setValor,
  editable,
}: {
  etiqueta: string;
  valor: string;
  setValor: (v: string) => void;
  editable: boolean;
}) {
  return (
    <div>
      <p className="font-semibold text-[#CCDB42] text-lg mb-1">{etiqueta}:</p>
      {editable ? (
        <textarea
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          rows={3}
          placeholder="Separar por comas"
          className="bg-[#1f3a6f] text-white rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#CCDB42]"
        />
      ) : valor.trim() ? (
        <ul className="list-disc list-inside text-gray-200 space-y-0.5 ml-2">
          {valor
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .map((item, i) => (
              <li key={i}>{item}</li>
            ))}
        </ul>
      ) : (
        <p className="italic text-gray-400">No hay {etiqueta.toLowerCase()} registrados.</p>
      )}
    </div>
  );
}
