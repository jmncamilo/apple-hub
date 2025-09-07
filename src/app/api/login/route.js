import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Buscar el usuario solo por email
    const result = await defaultPool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const user = result.rows[0];

    // Verificar la contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // Generar el token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Setear la cookie
    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Para producción en Vercel
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 horas
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
