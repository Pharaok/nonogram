import React from "react";
import { useDispatch } from "react-redux";

import "./Controls.scss";
import { clear } from "./slices/nonogram";
import { Brushes } from "./Cell";
import NonogramForm from "./NonogramForm";

const Controls: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="controls">
      <NonogramForm />
      <button
        onClick={() => {
          dispatch(clear(Brushes.All));
        }}
      >
        <span className="material-symbols-rounded">replay</span>
      </button>
    </div>
  );
};

export default Controls;
