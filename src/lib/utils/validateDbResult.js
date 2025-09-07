import { NextResponse } from "next/server";

export function validateDbResult(dbResult, errorMessage = 'No encontrado...', errorCode = 404) {
    if(!dbResult || dbResult.rows.length === 0) {
        return NextResponse.json(
            {error: errorMessage},
            {status: errorCode}
        );
    }
    return null;
}
