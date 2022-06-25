import React from "react";
import { useDispatch } from "react-redux";
import "./Controls.scss";
import { clear, resize } from "./reducers/grid";

const Controls: React.FC = () => {
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
