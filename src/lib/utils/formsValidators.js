// Email válido (formato estándar)
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,4}(\.[a-z]{2,4})?$/i.test(email);
}

// Teléfono colombiano (solo dígitos, 10 caracteres)
export function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

// Cédula de ciudadanía colombiana (entre 6 y 11 dígitos, solo números)
export function isValidNuip(nuip) {
  return /^\d{6,11}$/.test(nuip);
}

// Nombres y apellidos (solo letras y espacios, mínimo 2 caracteres)
export function isValidName(name) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/.test(name.trim());
}

// Validando la edad
export function isValidAge(age) {
  const num = Number(age);
  return Number.isInteger(num) && num >= 16 && num <= 120;
}

// Validador para price: debe ser un número mayor a 0
export function isValidPrice(price) {
  const num = Number(price);
  // Máximo permitido por DECIMAL(12,2): 9999999999.99
  return !isNaN(num) && num > 0 && num <= 9999999999.99;
}

// Validador para stock_quantity: debe ser un entero mayor o igual a 0
export function isValidStockQuantity(stock) {
  const num = Number(stock);
  // Razonable para stock 9999 unidades
  return Number.isInteger(num) && num >= 0 && num <= 9999;
}

// Validador para reference_code: formato AAPL-XXXXX (X = dígitos)
export function isValidReferenceCode(code) {
  return /^AAPL-\d{4}$/.test(code);
}

// Nombre de producto: letras, números, espacios internos, mínimo 2 caracteres, sin espacios al inicio/final
export function isValidProductName(name) {
  const trimmed = name.trim();
  // El nombre original debe ser igual al trimmeado (sin espacios al inicio/final)
  // Debe tener mínimo 2 caracteres y solo letras, números y espacios internos
  return (
    name === trimmed &&
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]{2,}$/.test(trimmed)
  );
}