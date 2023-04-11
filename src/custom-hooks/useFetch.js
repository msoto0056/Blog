// Usage: data = useFetch(Valid-API-URL)
import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const response = await fetch(url);
    const cleanData = await response.json();
    setData(cleanData);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);
  return { loading, data };
};