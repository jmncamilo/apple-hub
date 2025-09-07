import { defaultPool } from "@/lib/db";
import { NextResponse } from "next/server";
import { validateDbResult } from "@/lib/utils/validateDbResult";
import { castToDecimal, castToInt } from "@/lib/utils/castFromStrings";
import { validateFields } from "@/lib/utils/dictionaries/dicFunctionValidators";
import { validateParams } from "@/lib/utils/validateParams";
import { omitFields } from "@/lib/utils/omitFields";

export async function GET() {
  try {
    const result = await defaultPool.query("SELECT * FROM products ORDER BY created_at DESC");
    return NextResponse.json({ products: result.rows });
  } catch (error) {
    console.error("Error al consultar productos: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor..." },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    // Obteniendo el body completo
    const body = await request.json();

    // Validando los campos usando el diccionario de funciones
    const validation = validateFields(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: `El campo '${validation.field}' no cumple el formato requerido.` },
        { status: 400 }
      );
    }

    // Desestructurando solicitud
    const {product_name, reference_code, category, price, description, stock_quantity} = body;

    // Validando que los datos no sean vacíos, nulos o undefined
    if (!validateParams(product_name, reference_code, category, price, description, stock_quantity)) {
      return NextResponse.json(
        { error: "Verifica nuevamente los datos del producto..." },
        { status: 400 }
      );
    }

    // Casting de datos
    const intFields = ["stock_quantity"];
    const decimalFields = ["price"];
    let castedFields = castToInt(body, intFields);
    castedFields = castToDecimal(castedFields, decimalFields);

    // Insertando datos en BD
    const query = `INSERT INTO products (product_name, reference_code, category, price, description, stock_quantity)
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      castedFields.product_name,
      castedFields.reference_code,
      castedFields.category,
      castedFields.price,
      castedFields.description,
      castedFields.stock_quantity
    ];
    const result = await defaultPool.query(query, values);

    // Validando si se insertaron datos o hubo algún error de inserción
    const errorResponse = validateDbResult(result, "No se insertó el producto...", 500);
    if (errorResponse) return errorResponse;

    // Extrayendo los datos del nuevo producto insertado en una nueva fila
    const newProduct = result.rows[0];

    // Respuesta final al front
    return NextResponse.json(
      {
        success: true,
        newProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el proceso de inserción de producto: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...rawFields } = body;

    // Validando los campos usando el diccionario de funciones
    const validation = validateFields(rawFields);
    if (!validation.valid) {
      return NextResponse.json(
        { error: `El campo '${validation.field}' no cumple el formato requerido.` },
        { status: 400 }
      );
    }

    // Omitiendo campos que no deben actualizarse
    const fields = omitFields(rawFields, ["created_at", "updated_at"]);

    // Validar que haya al menos un campo para actualizar
    if (Object.keys(fields).length === 0) {
      return NextResponse.json(
        { error: "No se enviaron campos para actualizar." },
        { status: 400 }
      );
    }

    // Validar que el id exista
    if (!id) {
      return NextResponse.json(
        { error: "ID de producto requerido para actualizar." },
        { status: 400 }
      );
    }

    // Casting de datos
    const intFields = ["stock_quantity"];
    const decimalFields = ["price"];
    let castedFields = castToInt(fields, intFields);
    castedFields = castToDecimal(castedFields, decimalFields);

    // Construir la query dinámica
    const updates = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(castedFields)) {
      if (value !== undefined && value !== "") {
        updates.push(`${key} = $${idx}`);
        values.push(value);
        idx++;
      }
    }

    // Agregando el timestamp para actualizar la fecha del updated_at
    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    // Validación extra de que haya información antes de la inserción
    if (updates.length === 1) { // Solo el timestamp, sin otros campos
      return NextResponse.json(
        { error: "No se enviaron campos para actualizar." },
        { status: 400 }
      );
    }

    // Agregar el id al final
    values.push(id);

    const query = `UPDATE products SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await defaultPool.query(query, values);

    // Validando si se actualizaron datos o hubo algún error de actualización
    const errorResponse = validateDbResult(result, "No se encontró el producto para actualizar.", 404);
    if (errorResponse) return errorResponse;

    // Respuesta final al front
    return NextResponse.json(
      {
        success: true,
        updatedProduct: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el proceso de actualización de producto: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}


export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    // Validar que el id exista y sea un número válido
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "ID de producto requerido y válido para eliminar." },
        { status: 400 }
      );
    }

    // Eliminar el producto por id
    const query = "DELETE FROM products WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await defaultPool.query(query, values);

    // Validar si se eliminó algún producto
    if (!result || result.rowCount === 0) {
      return NextResponse.json(
        { error: "No se encontró el producto para eliminar." },
        { status: 404 }
      );
    }

    // Respuesta final al front
    return NextResponse.json(
      {
        success: true,
        deletedProduct: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el proceso de eliminación de producto: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}