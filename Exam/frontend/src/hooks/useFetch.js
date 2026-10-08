import { useState, useEffect } from "react";

// usage: useFetch(getAll)  or  useFetch(() => getOne(id), [id])
const useFetch = (loader, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    loader()
      .then((result) => !ignore && (setData(result), setError(null)))
      .catch((err) => !ignore && setError(err.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
};

export default useFetch;
