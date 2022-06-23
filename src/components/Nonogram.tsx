import React, { useState, useMemo } from "react";
import "./Nonogram.scss";
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

const makeClues = (grid: number[][]): number[][][] => {
  let rowHints = [Array(grid.length)];
  for (let i = 0; i < grid.length; ++i) {
    rowHints[i] = [];
    let consecutive = 0;
    for (let j = 0; j < grid[0].length; ++j) {
      if (grid[i][j]) {
        consecutive += 1;
      } else if (consecutive > 0) {
        rowHints[i].push(consecutive);
        consecutive = 0;
      }
    }
    if (consecutive > 0 || rowHints[i].length == 0) {
      rowHints[i].push(consecutive);
    }
  }

  let columnHints = Array(grid[0].length);
  for (let j = 0; j < grid[0].length; ++j) {
    columnHints[j] = [];
    let consecutive = 0;
    for (let i = 0; i < grid.length; ++i) {
      if (grid[i][j]) {
        consecutive += 1;
      } else if (consecutive > 0) {
        columnHints[j].push(consecutive);
        consecutive = 0;
      }
    }
    if (consecutive > 0 || columnHints[j].length == 0) {
      columnHints[j].push(consecutive);
    }
  }

  return [rowHints, columnHints];
};

type Props = {
  width: number;
  height: number;
};

const Nonogram: React.FC<Props> = (props) => {
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
  const [rowClues, columnClues] = makeClues(solution);
  console.log(rowClues, columnClues);

  // if (validateGrid(grid, solution)) {
  //   alert("You won!");
  // }

  return (
    <table className="nonogram">
      <tbody>
        <tr>
          <td></td>

          {columnClues.map((hint, i) => {
            return (
              // TODO: find alternative to verticalAlign
              <td key={i} style={{ verticalAlign: "bottom" }}>
                <Clue
                  clue={hint}
                  cells={grid.map((row) => row[i])}
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
                <Clue clue={rowClues[y]} cells={row} orientation="horizontal" />
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

export default Nonogram;
