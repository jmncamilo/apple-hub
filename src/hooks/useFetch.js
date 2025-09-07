import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    setIsLoading(true);

    async function fetchData() {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (url) fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, error, isLoading };
}