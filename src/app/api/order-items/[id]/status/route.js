import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // Validar el nuevo estado
    const validStatuses = ['Enviado', 'Entregado', 'Cancelado', 'Devuelto', 'Garantía'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Estado inválido" },
        { status: 400 }
      );
    }

    // Actualizar el estado en la BD
    await defaultPool.query(
      `UPDATE order_items SET status = $1 WHERE id = $2`,
      [status, id]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error actualizando estado del producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}