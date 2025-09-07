import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function POST(request) {
  try {
  
    const { email, password } = await request.json();

    // Validar que vengan los datos
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Consultar usuario en la base de datos por email y password
    const query =
      "SELECT id, name, email, role FROM users WHERE email = $1 AND password = $2";
    const result = await defaultPool.query(query, [email, password]);

    // Verificar si existe el usuario
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Por ahora sin JWT, solo devolvemos los datos del usuario
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
