import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function GET() {
  try {
    const result = await defaultPool.query(`
      SELECT 
        o.id,
        o.customer_id,
        o.delivery_address,
        o.total_amount,
        o.status,
        o.created_at,
        o.updated_at,
        c.nuip,
        c.names,
        c.lastnames,
        c.email,
        c.phone_number,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', oi.id,
            'order_id', oi.order_id,
            'product_id', oi.product_id,
            'product_name', p.product_name,
            'product_reference', p.reference_code,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'subtotal', oi.subtotal,
            'status', oi.status
          ) ORDER BY oi.id
        ) as order_items
      FROM orders o
      INNER JOIN customers c ON o.customer_id = c.id
      INNER JOIN order_items oi ON o.id = oi.order_id
      INNER JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, c.id
      ORDER BY o.created_at DESC;
    `);

    return NextResponse.json({
      success: true,
      orders: result.rows,
    }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo pedidos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}