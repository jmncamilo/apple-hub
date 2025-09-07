import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";

export async function GET() {
  try {
    // Ingresos de hoy
    const todayRows = await defaultPool.query(`
      SELECT 
        id,
        order_id,
        product_id,
        quantity,
        unit_price,
        subtotal,
        status,
        created_at
      FROM order_items
      WHERE status IN ('Enviado', 'Entregado', 'Garantía')
        AND created_at::date = CURRENT_DATE
      ORDER BY created_at DESC
    `);

    // Ingresos históricos (no hoy)
    const historicRows = await defaultPool.query(`
      SELECT 
        id,
        order_id,
        product_id,
        quantity,
        unit_price,
        subtotal,
        status,
        created_at
      FROM order_items
      WHERE status IN ('Enviado', 'Entregado', 'Garantía')
        AND created_at::date <> CURRENT_DATE
      ORDER BY created_at DESC
    `);

    // Calcular total histórico usando la función de la BD
    const totalResult = await defaultPool.query("SELECT total_revenues() AS total");
    const historicTotal = totalResult.rows[0]?.total ?? 0;

    // Calcular ingresos de hoy directamente en SQL
    const todayResult = await defaultPool.query(`
      SELECT COALESCE(SUM(subtotal), 0.00) AS today_total
      FROM order_items
      WHERE status IN ('Enviado', 'Entregado', 'Garantía')
        AND created_at::date = CURRENT_DATE
    `);
    const todayTotal = todayResult.rows[0]?.today_total ?? 0;

    return NextResponse.json({
      success: true,
      todayRevenues: todayRows.rows,
      historicRevenues: historicRows.rows,
      todayTotal,
      historicTotal,
    }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo ingresos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}