import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // Solo afecta scripts, Next.js lo ignora

// Pool superusuario de postgres por defecto
export const defaultPool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
      max: 10,
    })
  : new Pool({
      user: process.env.DB_DEFAULT_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD_DEFAULT,
      port: Number(process.env.DB_PORT),
      max: 10,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });

// Pool para administrador (CRUD completo y superusuario)
export const adminPool = new Pool({
  user: process.env.DB_ADMIN_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD_ADMIN,
  port: process.env.DB_PORT,
  max: 10,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Pool para empleados (No puede hacer operaciones de borrado)
export const employeePool = new Pool({
  user: process.env.DB_EMPLOYEE_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD_EMPLOYEE,
  port: process.env.DB_PORT,
  max: 5,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});