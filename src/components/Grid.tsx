import React from "react";
import { useSelector } from "react-redux";
import { useNonogramSelector } from "./hooks";

import "./Grid.scss";
import Cell from "./Cell";
import Clue from "./Clue";
import { NonogramState } from "./store";

interface Props {
  readonly?: boolean;
}

const Grid: React.FC<Props> = ({ readonly = false }) => {
  const grid = useSelector((state: NonogramState) => state.grid);
  const width = grid[0].length;
  const height = grid.length;
  const l = 60 / Math.max(width, height);
  const solution = useNonogramSelector((state) => state.solution);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `auto repeat(${width}, ${l}vmin)`,
        gridTemplateRows: `auto repeat(${height}, ${l}vmin)`,
      }}
    >
      <div></div>
      {grid[0].map((cell, x) => (
        <Clue
          cells={grid.map((row) => row[x])}
          solution={solution.map((row) => row[x])}
          orientation="vertical"
          key={`cc${x}`}
        />
      ))}
      {grid.map((row, y) => (
        <React.Fragment key={y}>
          <Clue cells={row} solution={solution[y]} orientation="horizontal" />
          {row.map((cell, x) => (
            <Cell x={x} y={y} readonly={readonly} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Grid;
