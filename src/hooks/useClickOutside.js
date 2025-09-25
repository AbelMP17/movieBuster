// src/hooks/useClickOutside.js
import { useEffect } from "react";

export default function useClickOutside(ref, callback, ignoreRef = null) {
  useEffect(() => {
    const handleClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        (!ignoreRef || !ignoreRef.current.contains(e.target))
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, callback, ignoreRef]);
}
