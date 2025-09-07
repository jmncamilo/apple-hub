import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT 
        w.id,
        w.order_item_id,
        w.warranty_reason,
        w.warranty_status,
        w.warranty_date,
        w.notes,
        w.created_at,
        o.id AS order_id,
        p.product_name,
        p.reference_code AS product_reference,
        oi.quantity,
        oi.unit_price,
        oi.subtotal,
        c.names AS customer_names,
        c.lastnames AS customer_lastnames,
        c.email AS customer_email
      FROM warranties w
        INNER JOIN order_items oi ON w.order_item_id = oi.id
        INNER JOIN orders o ON oi.order_id = o.id
        INNER JOIN products p ON oi.product_id = p.id
        INNER JOIN customers c ON o.customer_id = c.id
      ORDER BY w.created_at DESC;
    `;

    const result = await defaultPool.query(query);

    return NextResponse.json(
      { warranties: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error consultando garantías:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}