import React, { useState, useMemo } from "react";
import "./Grid.scss";
import Cell from "./Cell";
import Clue from "./Clue";

const generateBigInt = (size: number): bigint => {
  const seedArray = [];
  let i = size;
  while (i > 0) {
    let b = Math.min(i, 15);
    seedArray.push(
      Math.floor(Math.random() * Math.pow(2, b))
        .toString(2)
        .padStart(b, "0")
    );
    i -= b;
  }
  return BigInt("0b" + seedArray.join(""));
};

type Props = {
  width: number;
  height: number;
};

const Grid: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState(() => {
    let rows = [];
    for (let i = 0; i < props.height; i++) {
      rows.push(Array.from(Array(props.width), () => 0));
    }
    return rows;
  });
  const seed = useMemo(
    () => generateBigInt(props.width * props.height),
    [props.width, props.height]
  );
  const solution = useMemo(() => {
    return Array.from(grid, (x, i) => {
      return Array.from(x, (y, j) => {
        return Number(Boolean(seed & (1n << BigInt(i * props.width + j))));
      });
    });
  }, [seed]);

  // if (validateGrid(grid, solution)) {
  //   alert("You won!");
  // }

  return (
    <table className="grid">
      <tbody>
        <tr>
          <td></td>

          {grid[0].map((row, j) => {
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
                  <Cell
                    cell={grid[y][x]}
                    setCell={(v: number) => {
                      const newGrid = grid.map((row) =>
                        row.map((cell) => cell)
                      );
                      newGrid[y][x] = v;
                      setGrid(newGrid);
                    }}
                  />
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
