import {
  fetchDummy,
  selectCount,
  selectUsername,
  fetchJSON,
} from "features/customCounter/customCounterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";

export const ReduxAsync = () => {
  const count = useSelector(selectCount);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <span data-testid="count-value-async">{count}</span>
      <button
        onClick={() => {
          dispatch(fetchDummy(5));
        }}
      >
        fetchDummy
      </button>
      <div data-testid="Bred dummy">
        {username && <p data-testid="dummy-async-result">{username}</p>}
      </div>
      <button
        onClick={() => {
          dispatch(fetchJSON());
        }}
      >
        fetchJSON
      </button>
    </div>
  );
};
