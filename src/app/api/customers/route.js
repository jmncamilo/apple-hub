import { NextResponse } from "next/server";
import { defaultPool } from "@/lib/db";
import { validateParams } from "@/lib/utils/validateParams";
import { validateDbResult } from "@/lib/utils/validateDbResult";
import { castToDecimal, castToInt } from "@/lib/utils/castFromStrings";
import { omitFields } from "@/lib/utils/omitFields";
import { validateFields } from "@/lib/utils/dictionaries/dicFunctionValidators";

export async function GET() {
  try {
    const result = await defaultPool.query("SELECT * FROM customers ORDER BY created_at DESC");
    return NextResponse.json({ customers: result.rows });
  } catch (error) {
    console.error("Error al consultar clientes: ", error);
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
    const { nuip, names, lastnames, email, age, gender, address, phone_number } = body;

    // Validando que los datos no sean vacíos o nulos o undefined
    if (!validateParams(nuip, names, lastnames, email, age, gender, address, phone_number)) {
      return NextResponse.json(
        { error: "Verifica nuevamente los datos del cliente..." },
        { status: 400 }
      );
    }

    // Insertando datos en BD
    const query = `INSERT INTO customers (nuip, names, lastnames, email, age, gender, address, phone_number)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const values = [
      nuip,
      names,
      lastnames,
      email,
      age,
      gender,
      address,
      phone_number,
    ];
    const result = await defaultPool.query(query, values);

    // Validando si se insertaron datos o hubo algún error de inserción
    const errorResponse = validateDbResult(result, "No se insertó el cliente...", 500);
    if (errorResponse) return errorResponse;

    // Extrayendo los datos del nuevo cliente insertado en una nueva fila
    const newCustomer = result.rows[0];

    // Respuesta final al front
    return NextResponse.json(
      {
        success: true,
        newCustomer,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el proceso de inserción: ", error);
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
        { error: "ID de cliente requerido para actualizar." },
        { status: 400 }
      );
    }

    // Casting de datos
    const intFields = ["age"];
     // const decimalFields = ["salary"]; // Aca se ponen los campos que deben ser decimal en la bd

    let castedFields = castToInt(fields, intFields);
      // castedFields = castToDecimal(castedFields, decimalFields); // Acá se invoca ese cast a decimal

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
    if (updates.length === 0) {
      return NextResponse.json(
        { error: "No se enviaron campos para actualizar." },
        { status: 400 }
      );
    }

    // Agregar el id al final
    values.push(id);

    const query = `UPDATE customers SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await defaultPool.query(query, values);

    // Validando si se actualizaron datos o hubo algún error de actualización
    const errorResponse = validateDbResult(result, "No se encontró el cliente para actualizar.", 404);
    if (errorResponse) return errorResponse;

    // Respuesta final al front
    return NextResponse.json(
      {
        success: true,
        updatedCustomer: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el proceso de actualización: ", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}