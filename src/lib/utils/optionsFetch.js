export const getOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
  credentials: "same-origin", // Cambiar a 'include' si se usa cookies
};

export function postOptions(body) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(body),
  };
}

export function putOptions(body) {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(body),
  };
}

export function patchOptions(body) {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(body),
  };
}

export function deleteOptions(body) {
  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
    body: body ? JSON.stringify(body) : undefined,
  };
}
