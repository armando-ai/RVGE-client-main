import { useEffect, useRef } from "react";

export function useOutside<T extends HTMLElement>(callback: CallableFunction) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      const { current } = ref;
      if (current && !current.contains(event.target)) callback();
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
}
