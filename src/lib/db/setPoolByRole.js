import { adminPool, employeePool, defaultPool } from "./index.js";

export function setDefaultPoolByRole(role) {
  if (role === "admin") {
    defaultPool = adminPool;
  } else if (role === "empleado") {
    defaultPool = employeePool;
  } else {
    defaultPool = postgresPool;
  }
}