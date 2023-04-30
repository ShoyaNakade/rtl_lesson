import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
  selectUsername,
} from "features/customCounter/customCounterSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MyRedux = () => {
  const [number, setNumber] = useState(0);
  const count = useSelector(selectCount);

  const dispatch = useDispatch();
  return (
    <div>
      <h3 className=""> Redux Integration Test</h3>
      <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
        <span data-testid="count-value">{count}</span>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>
        <button onClick={() => dispatch(incrementByAmount(number | 0))}>
          IncrementByAmount
        </button>
        <input
          type="number"
          placeholder="Enter"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
