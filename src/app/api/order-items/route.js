import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";
import { validateFields } from "@/lib/utils/dictionaries/dicFunctionValidators";
import { castToInt } from "@/lib/utils/castFromStrings";

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer_id, delivery_address, items } = body;

    // Validaciones básicas
    if (!customer_id || !delivery_address || !items) {
      return NextResponse.json(
        {
          error:
            "Faltan campos obligatorios: customer_id, delivery_address o items.",
        },
        { status: 400 }
      );
    }

    // Validar los campos principales
    const validation = validateFields({ customer_id, delivery_address });
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: `El campo '${validation.field}' no cumple el formato requerido.`,
        },
        { status: 400 }
      );
    }

    // Casting de customer_id
    const castedCustomerId = castToInt({ customer_id }, ["customer_id",]).customer_id;

    // Validar y castear los items
    let parsedItems;
    try {
      parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    } catch {
      return NextResponse.json(
        { error: "El campo 'items' debe ser un array válido de objetos." },
        { status: 400 }
      );
    }

    if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
      return NextResponse.json(
        { error: "El campo 'items' debe ser un array no vacío." },
        { status: 400 }
      );
    }

    // Casting de product_id y quantity en cada item
    for (const item of parsedItems) {
      item.product_id = castToInt({ product_id: item.product_id }, ["product_id"]).product_id;
      item.quantity = castToInt({ quantity: item.quantity }, ["quantity"]).quantity;
    }

    // Llamar al procedure de la BD
    await defaultPool.query(`CALL create_order($1, $2, $3::jsonb)`, [
      castedCustomerId,
      delivery_address,
      JSON.stringify(parsedItems),
    ]);

    // Opcional: puedes retornar el último pedido creado si lo necesitas
    const ordersResult = await defaultPool.query(
      `SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [castedCustomerId]
    );

    return NextResponse.json(
      {
        success: true,
        createdOrder: ordersResult.rows[0] || null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el proceso de creación de pedido: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}