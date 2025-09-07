export function validateParams(...params) {
  return params.every(
    (param) => param !== undefined && param !== null && param !== ""
  );
}