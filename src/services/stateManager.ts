/* eslint-disable react-hooks/rules-of-hooks */
import { useSyncExternalStore } from 'react';

type SetterStateFn<T> = (state: T) => Partial<T>;
type CreateStateFn<T> = (
  setState: (partialState: Partial<T> | SetterStateFn<T>) => void,
  getState: () => T
) => T;

export class CreateStoreService<
  TState extends Record<string | number, unknown>
> {
  private state: TState;
  private listeners: Set<() => void>;

  constructor(private readonly createState: CreateStateFn<TState>) {
    this.listeners = new Set();
    this.state = this.createState(this.setState, this.getState);
  }

  public useStore = <TValue>(selector: (currentState: TState) => TValue) => {
    return useSyncExternalStore(this.subscribe, () => selector(this.state));
  };

  private setState = (
    partialState: Partial<TState> | SetterStateFn<TState>
  ) => {
    if (typeof partialState === 'function') {
      this.updateState(partialState(this.state));
      return;
    }

    this.updateState(partialState);
  };

  private getState = () => {
    return this.state;
  };

  private subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  private notifyListeners = () => {
    this.listeners.forEach((listener) => listener());
  };

  private updateState = (value: Partial<TState>) => {
    this.state = {
      ...this.state,
      ...value,
    };

    this.notifyListeners();
  };
}
