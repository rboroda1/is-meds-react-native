import { useState, useEffect } from "react";

export var refreshLoad;

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    console.log("useFetch useEffect url =", url);

    if (url && refresh) {
      setIsPending(true);
      console.log("fetch", url);
      // setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          console.log("res", res.status);
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setRefresh(false);
          console.log("json data", data);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          // auto catches network / connection error
          if (err.name !== "AbortError") {
            setIsPending(false);
            setRefresh(false);
            setError(err.message);
            setData(null);
          }
        });
    }
    // }, 2000);

    return () => {
      console.log("Cleanup");
      abortCont.abort();
    };
  }, [url, refresh]);

  const abortCb = () => {
    abortCont.abort();
    setIsLoading(false);
    setRefresh(false);
  };

  const refreshCb = () => {
    setRefresh(true);
  };

  refreshLoad = refreshCb;

  return { data, isPending, error, abortCb, refreshCb };
};

export default useFetch;
