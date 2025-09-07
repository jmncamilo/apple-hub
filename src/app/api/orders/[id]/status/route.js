import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // Validar el nuevo estado
    const validStatuses = ['En Proceso', 'Entregado', 'Cancelado', 'Devuelto'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Estado inválido" },
        { status: 400 }
      );
    }

    // Actualizar el estado en la BD
    await defaultPool.query(
      `UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
      [status, id]
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error actualizando estado del pedido:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}