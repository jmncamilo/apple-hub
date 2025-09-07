import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT 
        r.id,
        r.order_item_id,
        r.return_reason,
        r.return_status,
        r.return_date,
        r.completion_date,
        r.notes,
        r.created_at,
        r.updated_at,
        o.id AS order_id,
        p.product_name,
        p.reference_code AS product_reference,
        oi.quantity,
        oi.unit_price,
        oi.subtotal,
        c.names AS customer_names,
        c.lastnames AS customer_lastnames,
        c.email AS customer_email
      FROM returns r
        INNER JOIN order_items oi ON r.order_item_id = oi.id
        INNER JOIN orders o ON oi.order_id = o.id
        INNER JOIN products p ON oi.product_id = p.id
        INNER JOIN customers c ON o.customer_id = c.id
      ORDER BY r.created_at DESC;
    `;

    const result = await defaultPool.query(query);

    return NextResponse.json(
      { returns: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error consultando devoluciones:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


// PATCH para actualizar motivo y notas de una devolución
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, return_reason, notes } = body;

    // Validaciones básicas
    if (!id) {
      return NextResponse.json(
        { error: "ID de la devolución requerido." },
        { status: 400 }
      );
    }

    // Validar que al menos uno de los campos venga para actualizar
    if (
      (return_reason === undefined || return_reason === null) &&
      (notes === undefined || notes === null)
    ) {
      return NextResponse.json(
        { error: "No se enviaron campos para actualizar." },
        { status: 400 }
      );
    }

    // Construir query dinámica
    const updates = [];
    const values = [];
    let idx = 1;

    if (return_reason !== undefined) {
      updates.push(`return_reason = $${idx}`);
      values.push(return_reason);
      idx++;
    }
    if (notes !== undefined) {
      updates.push(`notes = $${idx}`);
      values.push(notes);
      idx++;
    }
    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE returns
      SET ${updates.join(", ")}
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await defaultPool.query(query, values);

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
    console.error("Error actualizando devolución:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}