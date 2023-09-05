import { useState, useEffect } from "react";
import {toast} from "react-toastify";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          toast.error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          toast.error("Fetch Aborted");
        } else {
          toast.error(err.message);
          setIsPending(false);
        }
      });
    return () => abortController.abort();
  }, [url]);

  return { data, isPending };
};

export default useFetch;
