import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api/api';

const useFetch = (url, options = {}) => {
  const {
    method = 'get',
    params = undefined,
    body = undefined,
    headers = undefined,
    immediate = true,
    deps = [],
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetcher = useCallback(
    async (override = {}) => {
      setLoading(true);
      setError(null);
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      try {
        const res = await api.request({
          url,
          method: override.method || method,
          params: override.params || params,
          data: override.body || body,
          headers: override.headers || headers,
          signal: controllerRef.current.signal,
        });
        setData(res.data);
        setLoading(false);
        return res.data;
      } catch (err) {
        // axios cancel handling (v1+ supports AbortController)
        const isCanceled = err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError';
        if (!isCanceled) {
          setError(err);
          setLoading(false);
          throw err;
        }
        // cancelled -> remain silent
      }
    },
    // stringify to include object changes in deps
    [url, method, JSON.stringify(params || {}), JSON.stringify(body || {}), JSON.stringify(headers || {}), ...deps]
  );

  useEffect(() => {
    if (immediate) {
      fetcher().catch(() => {});
    }
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [fetcher, immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetcher,
    cancel: () => controllerRef.current && controllerRef.current.abort(),
  };
};

export default useFetch;