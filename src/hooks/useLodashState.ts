import { cloneDeep, set } from 'lodash';

class useLodashState<T> {
  private state: T;
  private listeners: ((state: T) => void)[] = [];

  constructor(initialState: T) {
    this.state = cloneDeep(initialState);
  }

  getState() {
    return this.state;
  }

  setState(path: string, value: any) {
    const newState = cloneDeep(this.state);
    set(newState, path, value);
    this.state = newState;
    this.notify();
  }

  subscribe(listener: (state: T) => void) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (state: T) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export default useLodashState;

