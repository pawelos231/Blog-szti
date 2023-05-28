import { useEffect, useState } from 'react';

type MediaQueryList = {
  matches: boolean;
  addListener: (callback: MediaQueryListListener) => void;
  removeListener: (callback: MediaQueryListListener) => void;
};

type MediaQueryListListener = () => void;

type UseMediaOptions<T> = {
  queries: string[];
  values: T[];
  defaultValue: T;
};

export default function useMedia<T>({ queries, values, defaultValue }: UseMediaOptions<T>): T {
  const mediaQueryLists: MediaQueryList[] = queries.map(q => window.matchMedia(q));

  const getValue = (): T => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  }, []);

  return value;
}

