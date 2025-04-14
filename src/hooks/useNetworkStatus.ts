import { useEffect, useState } from "react";

const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState<boolean>(getOnLineStatus());

  const updateNetworkStatus = () => {
    setOnline(getOnLineStatus());
  };

  useEffect(() => {
    updateNetworkStatus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener("load", updateNetworkStatus, {
      signal,
    });
    window.addEventListener("online", updateNetworkStatus, {
      signal,
    });
    window.addEventListener("offline", updateNetworkStatus, {
      signal,
    });

    return () => {
      controller.abort();
    };
  }, [navigator.onLine]);

  return { isOnline };
};

export default useNetworkStatus;
