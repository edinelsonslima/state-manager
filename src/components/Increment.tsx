import { useCounter } from '../hooks/useCounter';

export function Increment() {
  const increment = useCounter((state) => state.increment);
  return <button onClick={increment}>+</button>;
}
