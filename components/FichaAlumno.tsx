"use client";

import { useEffect, useState } from "react";

type Habilidad = {
  nombre: string;
  nivel: "bronce" | "plata" | "oro";
};

type Alumno = {
  id: number;
  nombre: string;
  añoNacimiento: number;
  ciclo: string;
  curso: string;
  añoEscolar: string;
  intereses: string[];
  habilidades: Habilidad[];
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
  const [editHabilidades, setEditHabilidades] = useState<Habilidad[]>([]);

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
        setEditHabilidades(data.habilidades);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchAlumno();
  }, [alumnoId]);

  function toggleBuscando(e: React.ChangeEvent<HTMLInputElement>) {
    if (!editMode) return;
    setBuscandoPracticas(e.target.checked);
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
      habilidades: editHabilidades,
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
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-extrabold text-[#CCDB42]">
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

      <div className="mb-4">
        <EtiquetasListaEditable
          etiqueta="Intereses"
          valor={editIntereses}
          setValor={setEditIntereses}
          editable={editMode}
        />
      </div>

      <div className="mb-6">
        <HabilidadesListaEditable
          habilidades={editHabilidades}
          setHabilidades={setEditHabilidades}
          editable={editMode}
        />
      </div>

      <div className="mb-4 space-y-2">
        <LabelDatoEditable
          etiqueta="Año nacimiento"
          valor={editAñoNacimiento}
          setValor={setEditAñoNacimiento}
          editable={editMode}
          tipo="number"
          menosDestacado={true}
        />
        <LabelDatoEditable etiqueta="Ciclo" valor={editCiclo} setValor={setEditCiclo} editable={editMode} menosDestacado={true} />
        <LabelDatoEditable etiqueta="Curso" valor={editCurso} setValor={setEditCurso} editable={editMode} menosDestacado={true} />
        {/* <LabelDatoEditable etiqueta="Año escolar" valor={editAñoEscolar} setValor={setEditAñoEscolar} editable={editMode} menosDestacado={true} /> */}
      </div>

      <div className="mb-6 flex items-center gap-3">
        <span className="font-semibold text-[#CCDB42] text-l select-none">
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
  menosDestacado = false,
}: {
  etiqueta: string;
  valor: string;
  setValor: (v: string) => void;
  editable: boolean;
  tipo?: string;
  menosDestacado?: boolean;
}) {
  return (
    <p
      className={`flex gap-2 items-center ${menosDestacado
        ? "text-gray-400 text-sm font-normal"
        : "text-white text-lg font-semibold"
        }`}
    >
      <span
        className={`w-44 ${menosDestacado
          ? "text-gray-400 font-normal"
          : "text-[#CCDB42] font-semibold"
          }`}
      >
        {etiqueta}:
      </span>
      {editable ? (
        <input
          type={tipo}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className={`rounded px-2 py-1 w-full focus:outline-none focus:ring-2 ${menosDestacado
            ? "bg-[#1f3a6f] text-gray-300 focus:ring-gray-400"
            : "bg-[#1f3a6f] text-white focus:ring-[#CCDB42]"
            } text-sm`}
        />
      ) : (
        <span className={menosDestacado ? "text-gray-400 text-sm" : "text-gray-200"}>
          {valor}
        </span>
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

function HabilidadesListaEditable({
  habilidades,
  setHabilidades,
  editable,
}: {
  habilidades: Habilidad[];
  setHabilidades: (h: Habilidad[]) => void;
  editable: boolean;
}) {
  function cambiarNivel(index: number, nuevoNivel: Habilidad["nivel"]) {
    const nuevas = [...habilidades];
    nuevas[index].nivel = nuevoNivel;
    setHabilidades(nuevas);
  }

  function cambiarNombre(index: number, nuevoNombre: string) {
    const nuevas = [...habilidades];
    nuevas[index].nombre = nuevoNombre;
    setHabilidades(nuevas);
  }

  function añadirHabilidad() {
    setHabilidades([...habilidades, { nombre: "", nivel: "bronce" }]);
  }

  function eliminarHabilidad(index: number) {
    setHabilidades(habilidades.filter((_, i) => i !== index));
  }

  return (
    <div>
      <p className="font-semibold text-[#CCDB42] text-lg mb-1">Habilidades:</p>
      {habilidades.length === 0 && !editable && (
        <p className="italic text-gray-400">No hay habilidades registradas.</p>
      )}
      {!editable && (
        <ul className="list-disc list-outside text-gray-200 space-y-2 pl-5">
          {habilidades.map((h, i) => (
            <li key={i} className="w-40"> {/* ancho fijo para alinear */}
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-200">{h.nombre}</span>
                <div className="flex gap-1">
                  {["bronce", "plata", "oro"].map((nivel) => {
                    const isActive = h.nivel === nivel;
                    const baseColor =
                      nivel === "oro" ? "bg-yellow-400" :
                        nivel === "plata" ? "bg-gray-300" :
                          "bg-[#cd7f32]";
                    return (
                      <span
                        key={nivel}
                        className={`inline-block w-4 h-4 rounded-full border-2 border-white
                    ${isActive ? baseColor : "bg-transparent opacity-40 border-gray-500"}`}
                        title={nivel}
                      ></span>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editable && (
        <button
          onClick={añadirHabilidad}
          className="mt-2 px-3 py-1 bg-[#CCDB42] text-[#24396C] rounded hover:bg-yellow-300 transition"
        >
          Añadir habilidad
        </button>
      )}
    </div>
  );
}
