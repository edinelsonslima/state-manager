import { useCounter } from '../hooks/useCounter';

export function Decrement() {
  const decrement = useCounter((state) => state.decrement);
  return <button onClick={decrement}>-</button>;
}
