import { useState, useEffect, useCallback } from 'react';
import { cloneDeep, set } from 'lodash';

const useLodashState = <T>(initialState: T) => {
  const [state, setState] = useState<T>(cloneDeep(initialState));
  const [listeners, setListeners] = useState<((state: T) => void)[]>([]);

  const getState = useCallback(() => state, [state]);

  const updateState = useCallback((path: string, value: any) => {
    const newState = cloneDeep(state);
    set(newState, path, value);
    setState(newState);
    listeners.forEach((listener) => listener(newState));
  }, [state, listeners]);

  const subscribe = useCallback((listener: (state: T) => void) => {
    setListeners((prevListeners) => [...prevListeners, listener]);
    return () => {
      setListeners((prevListeners) => prevListeners.filter((l) => l !== listener));
    };
  }, []);

  return { getState, setState: updateState, subscribe };
};

export default useLodashState;

