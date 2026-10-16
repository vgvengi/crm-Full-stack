import { useEffect, type RefObject } from "react";

// Runs callback whenever the user clicks outside the element attached to ref.
function useClickOutSide<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
) {
  useEffect(() => {
    function handleOutSideEvent(event: MouseEvent) {
      // Ignore clicks inside the referenced element; close or dismiss it otherwise.
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    // Listen while this hook is active, then remove the listener when it is cleaned up.
    document.addEventListener("mousedown", handleOutSideEvent);
    return () => {
      document.removeEventListener("mousedown", handleOutSideEvent);
    };
  }, [ref, callback]);
}

export default useClickOutSide;
