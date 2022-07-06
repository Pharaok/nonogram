import React, { useEffect, useMemo, useState } from "react";
import { useNonogramDispatch, useNonogramSelector } from "./hooks";

import "./Grid.scss";
import Cell, { Brushes } from "./Cell";
import Clue from "./Clue";
import { isEqual } from "lodash-es";
import { createClues } from "../helpers";
import { clear } from "./slices/nonogram";

const Grid: React.FC = () => {
  const grid = useNonogramSelector((state) => state.grid);
  const width = grid[0].length;
  const height = grid.length;
  const l = 60 / Math.max(width, height);
  const solution = useNonogramSelector((state) => state.solution);
  const [solved, setSolved] = useState(false);

  const dispatch = useNonogramDispatch();

  const clues = useMemo(
    () => [
      solution.map((row) => createClues(row)),
      solution[0].map((cell, x) => createClues(solution.map((row) => row[x]))),
    ],
    [solution]
  );

  useEffect(() => {
    setSolved(
      isEqual(
        [
          grid.map((row) => createClues(row)),
          grid[0].map((cell, x) => createClues(grid.map((row) => row[x]))),
        ],
        clues
      )
    );
  }, [grid]);

  useEffect(() => {
    dispatch(clear(Brushes.Marked));
  }, [solved]);

  return (
    <div
      className={`grid ${solved ? "solved" : ""}`}
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
          key={x}
        />
      ))}
      {grid.map((row, y) => (
        <React.Fragment key={y}>
          <Clue cells={row} solution={solution[y]} orientation="horizontal" />
          {row.map((cell, x) => (
            <Cell x={x} y={y} readonly={solved} key={x} />
          ))}
        </React.Fragment>
      ))}
      <svg
        className="background"
        style={{ gridArea: `2 / 2 / ${2 + height} / ${2 + width}` }}
        viewBox={`0 0 ${width} ${height}`}
        shapeRendering="crispEdges"
      >
        {solution.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <rect x={x} y={y} width={1} height={1} key={`${x}-${y}`} />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};

export default Grid;
