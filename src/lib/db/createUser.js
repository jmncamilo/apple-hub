import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // Carga las variables solo para este script

import bcrypt from "bcrypt";
import { defaultPool } from "./index.js";

// console.log("DB_PASSWORD_DEFAULT:", process.env.DB_PASSWORD_DEFAULT);

async function createUser(name, email, password, role = "empleado") {
  const hashedPassword = await bcrypt.hash(password, 10);
  await defaultPool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
    [name, email, hashedPassword, role]
  );
  console.log("Usuario creado:", email);
}

// Ejecuta el script para crear un usuario de ejemplo; puedes modificar los valores según tus necesidades
createUser("Usuario Empleado", "empleado@gmail.com", "empleado", "empleado")
  .then(() => process.exit())
  .catch(err => { console.error(err); process.exit(1); });