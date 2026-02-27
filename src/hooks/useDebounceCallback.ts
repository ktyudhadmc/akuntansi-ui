import { useMemo, useEffect } from "react";
import debounce from "lodash/debounce";

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
) {
  const debouncedFn = useMemo(
    () => debounce(callback, delay),
    [callback, delay],
  );

  useEffect(() => {
    return () => debouncedFn.cancel();
  }, [debouncedFn]);

  return debouncedFn;
}
