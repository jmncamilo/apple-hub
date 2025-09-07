import { useState } from "react";

export function useFetchAction() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const request = async (url, options) => {
    setError(null);
    setData(null);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  return { data, error, request };
}