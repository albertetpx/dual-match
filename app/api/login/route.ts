import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "claumestra",
  database: "tinder_practicas",
});

export async function POST(req: Request) {
  const { tipo, email, password } = await req.json();

  const tabla = tipo === "alumno" ? "alumnos" : tipo === "empresa" ? "empresas" : "admin";
  if (tabla === "admin") {
    if (email === "admin@admin.com" && password === "admin") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }

  try {
    const [rows]: any = await pool.query(`SELECT * FROM ${tabla} WHERE email = ? AND password = ?`, [email, password]);
    if (rows.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}