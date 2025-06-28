import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#24396C] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Match de Prácticas</h1>
      <p className="mb-6 text-center max-w-xl">
        Conecta a alumnos de desarrollo web con empresas que buscan talento joven. Inspírate, desliza y haz match.
      </p>
      <Link href="/admin">
        <Button className="mt-6 bg-[#CCDB42] text-[#24396C] hover:bg-[#b6c622]">Panel de Administraciónnn</Button>
      </Link>
    </main>
  );
}