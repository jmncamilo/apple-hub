import {
  isValidEmail,
  isValidName,
  isValidNuip,
  isValidPhone,
  isValidAge,
  isValidPrice,
  isValidStockQuantity,
  isValidReferenceCode,
  isValidProductName
} from "../formsValidators";

export const fieldValidators = {
  nuip: isValidNuip,
  names: isValidName,
  lastnames: isValidName,
  email: isValidEmail,
  phone_number: isValidPhone,
  age: isValidAge,
  price: isValidPrice,
  stock_quantity: isValidStockQuantity,
  reference_code :isValidReferenceCode,
  product_name: isValidProductName
  // Agregar los demás validadores acá :)
};

// Esta función valida todos los campos según el diccionario
export function validateFields(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (fieldValidators[key] && !fieldValidators[key](value)) {
      return { valid: false, field: key };
    }
  }
  return { valid: true };
}
