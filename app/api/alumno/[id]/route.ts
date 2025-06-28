import { NextResponse } from "next/server";

const mockAlumnos = [
  {
    id: 1,
    nombre: "Lucía Pérez Sanllehí",
    añoNacimiento: 2005,
    ciclo: "DAW",
    curso: "2º",
    añoEscolar: "24-25",
    intereses: ["Frontend", "UI/UX", "DevOps"],
    habilidades: ["JavaScript","React","NextJS", "Figma", "Docker"],
    buscandoPracticas: true,
    cvUrl: "/cvs/lucia_perez.pdf",
  },
  {
    id: 2,
    nombre: "Carlos Gómez",
    añoNacimiento: 2004,
    ciclo: "Administración de Sistemas",
    curso: "1º",
    añoEscolar: "24-25",
    intereses: ["Redes", "Seguridad"],
    habilidades: ["Linux", "Docker"],
    buscandoPracticas: false,
    cvUrl: null,
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const alumno = mockAlumnos.find((a) => a.id === id);

  if (!alumno) {
    return NextResponse.json({ error: "Alumno no encontrado" }, { status: 404 });
  }

  return NextResponse.json(alumno);
}
    