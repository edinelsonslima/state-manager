import { useCounter } from '../hooks/useCounter';

export function Count() {
  const count = useCounter((state) => state.count);
  return <h1>{count}</h1>;
}
