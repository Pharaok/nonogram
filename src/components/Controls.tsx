import produce from "immer";
import React, { useContext } from "react";
import GridContext from "./GridContext";

const Controls = () => {
  const { grid, setGrid } = useContext(GridContext);
  return (
    <div>
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
