import { Card } from "@/components/ui/card";

const alumnos = [
  { nombre: "Lucía Pérez", intereses: "Frontend, UI/UX", tecnologias: "React, Figma" },
  { nombre: "Carlos Ruiz", intereses: "Backend, DevOps", tecnologias: "Node.js, Docker" },
  { nombre: "Ana Torres", intereses: "Fullstack", tecnologias: "Vue, Express" },
];

const empresas = [
  { nombre: "WebSolutions", puesto: "Frontend Developer Intern" },
  { nombre: "TechCorp", puesto: "Backend Developer" },
];

export default function AdminPanel() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] text-[#24396C] p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-2xl mb-4">Alumnos</h2>
          {alumnos.map((alumno, i) => (
            <Card key={i} className="p-4 mb-4">
              <p className="font-semibold">{alumno.nombre}</p>
              <p>Intereses: {alumno.intereses}</p>
              <p>Tecnologías: {alumno.tecnologias}</p>
            </Card>
          ))}
        </section>
        <section>
          <h2 className="text-2xl mb-4">Empresas</h2>
          {empresas.map((empresa, i) => (
            <Card key={i} className="p-4 mb-4">
              <p className="font-semibold">{empresa.nombre}</p>
              <p>Puesto: {empresa.puesto}</p>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}