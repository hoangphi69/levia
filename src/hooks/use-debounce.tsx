import { useCallback, useRef } from 'react';

/**
 * A custom hook that debounces a function execution by a specified delay.
 * @param callback The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns A debounced version of the callback function.
 */
const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
};

export default useDebounce;
