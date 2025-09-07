import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, return_status } = body;

    if (!id || !return_status) {
      return NextResponse.json(
        { error: "ID y nuevo estado requeridos." },
        { status: 400 }
      );
    }

    // Validar estado permitido
    const allowed = ["Solicitada", "Aprobada", "Rechazada", "Completada"];
    if (!allowed.includes(return_status)) {
      return NextResponse.json(
        { error: "Estado de devolución no permitido." },
        { status: 400 }
      );
    }

    const query = `
      UPDATE returns
      SET return_status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await defaultPool.query(query, [return_status, id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "No se encontró la devolución para actualizar." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, updatedReturn: result.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error actualizando estado de devolución:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}