export function castToInt(fields, keys) {
  const result = { ...fields };
  keys.forEach((key) => {
    const value = result[key];
    if (value !== undefined && value !== "" && !isNaN(parseInt(value, 10))) {
      result[key] = parseInt(value, 10);
    }
  });
  return result;
}

export function castToDecimal(fields, keys) {
  const result = { ...fields };
  keys.forEach((key) => {
    const value = result[key];
    if (value !== undefined && value !== "" && !isNaN(parseFloat(value))) {
      result[key] = parseFloat(parseFloat(value).toFixed(2));
    }
  });
  return result;
}