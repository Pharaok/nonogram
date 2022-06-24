import React, { useContext } from "react";
import produce, { applyPatches, Patch } from "immer";
import "./Controls.scss";
import GridContext from "./GridContext";

let changes: Patch[] = [];
let inverseChanges: Patch[] = [];

const Controls = () => {
  const { grid, setGrid } = useContext(GridContext);
  return (
    <div className="controls">
      <button
        onClick={() => {
          setGrid(
            produce(grid, (grid) => {
              grid.forEach((row) => {
                row.fill(0);
              });
            })
          );
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Controls;
