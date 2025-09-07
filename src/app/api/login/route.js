import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Verifica usuario en la BD
    const result = await defaultPool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const user = result.rows[0];

    // Genera el token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Setea la cookie
    const response = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // process.env.NODE_ENV === "production"
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 horas
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
