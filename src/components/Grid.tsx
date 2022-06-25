import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./Grid.scss";
import Cell from "./Cell";
import Clue from "./Clue";
import { useDispatch } from "react-redux";
import { State } from "./store";
import { color } from "./slices/grid";

const Grid: React.FC = () => {
  const grid = useSelector((state: State) => state.nonogram.grid);
  const solution = useSelector((state: State) => state.nonogram.solution);
  const dispatch = useDispatch();

  return (
    <table className="grid">
      <tbody>
        <tr>
          <td></td>

          {grid[0].map((cell, j) => {
            return (
              // TODO: find alternative to verticalAlign
              <td key={j} style={{ verticalAlign: "bottom" }}>
                <Clue
                  cells={grid.map((row) => row[j])}
                  solution={solution.map((row) => row[j])}
                  orientation="vertical"
                />
              </td>
            );
          })}
        </tr>

        {grid.map((row, y) => {
          return (
            <tr key={y}>
              <td>
                <Clue
                  cells={row}
                  solution={solution[y]}
                  orientation="horizontal"
                />
              </td>

              {row.map((cell, x) => (
                <td key={x}>
                  <Cell x={x} y={y} />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
