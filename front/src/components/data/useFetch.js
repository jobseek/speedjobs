import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(url);
      await setList((prev) => [...new Set([...prev, ...res.data])]);
      await setHasMore(res.data.doc.length > 0);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery().catch((err) => null);
  }, [query, sendQuery, page]);

  return { loading, error, list, hasMore };
}
