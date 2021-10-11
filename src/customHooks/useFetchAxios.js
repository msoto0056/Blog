// Usage: data = useFetch(Valid-API-URL)
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [errorMsg,setErrorMsg] = useState('');

  const getData = useCallback(async () => {
    try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
        setIsError(false)
        setErrorMsg('');
    } catch (error) {
        setData([])
        setLoading(false);
        setIsError(true);
        setErrorMsg('Error loading Data...! check url')
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [url, getData]);
  return { data,isLoading, isError, errorMsg };
};

