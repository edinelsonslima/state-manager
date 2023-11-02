import { CreateStoreService } from '../services/stateManager';

type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

function increment({ count }: CounterState) {
  return { count: count + 1 };
}

function decrement({ count }: CounterState) {
  return { count: count - 1 };
}

const { useStore } = new CreateStoreService<CounterState>((set) => ({
  count: 0,
  increment: () => set(increment),
  decrement: () => set(decrement),
}));

export const useCounter = useStore;
