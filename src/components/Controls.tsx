import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Controls.scss";
import { clear, resize } from "./reducers/grid";
import { State } from "./store";

const Controls = () => {
  const grid = useSelector((state: State) => state.nonogram);
  const dispatch = useDispatch();
  return (
    <div className="controls">
      <button
        onClick={() => {
          dispatch(clear());
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          dispatch(resize(10, 10));
        }}
      >
        Resize
      </button>
    </div>
  );
};

export default Controls;
