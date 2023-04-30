import React from "react";
import { useCounter } from "useCounter";

export const CustomeHooks = () => {
  const { count, increment, decrement, double, triple, reset } = useCounter(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={double}>Double</button>
      <button onClick={triple}>Triple</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
