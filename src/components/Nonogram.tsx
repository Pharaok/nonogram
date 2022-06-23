import React, { useState, useMemo } from "react";
import "./Nonogram.scss";
import Cell, { CellState } from "./Cell";
import Clue, { Clueee } from "./Clue";

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

const makeClues = (grid: number[][]): Clueee[][][] => {
  let rowHints = [Array(grid.length)];
  for (let i = 0; i < grid.length; ++i) {
    rowHints[i] = [];
    let consecutive = 0;
    for (let j = 0; j < grid[0].length; ++j) {
      if (grid[i][j]) {
        consecutive += 1;
      } else if (consecutive > 0) {
        rowHints[i].push({ consecutive, solved: false });
        consecutive = 0;
      }
    }
    if (consecutive > 0 || rowHints[i].length == 0) {
      rowHints[i].push({ consecutive, solved: false });
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
        columnHints[j].push({ consecutive, solved: false });
        consecutive = 0;
      }
    }
    if (consecutive > 0 || columnHints[j].length == 0) {
      columnHints[j].push({ consecutive, solved: false });
    }
  }

  return [rowHints, columnHints];
};

const findSolvedClues = (
  grid: number[][],
  clues: Clueee[][][]
): Clueee[][][] => {
  const [rowClues, columnClues] = clues;
  let consecutive = 0;
  let c = -1;
  let prevC = -1;
  for (let i = 0; i < grid.length; ++i) {
    consecutive = 0;
    prevC = -1;
    for (let j = 0; j < grid[0].length; ++j) {
      if (grid[i][j] & CellState.Colored) {
        consecutive += 1;
      } else if (consecutive > 0) {
        c = rowClues[i].findIndex(
          (c, k) => c.consecutive == consecutive && k > prevC
        );
        prevC = c;
        if (c != -1) {
          rowClues[i][c].solved = true;
        }
        consecutive = 0;
      }
    }
    c = rowClues[i].findIndex(
      (clue, k) => clue.consecutive == consecutive && k > prevC
    );
    if (c != -1) {
      rowClues[i][c].solved = true;
    }
  }
  for (let j = 0; j < grid[0].length; ++j) {
    consecutive = 0;
    prevC = -1;
    for (let i = 0; i < grid.length; ++i) {
      if (grid[i][j] & CellState.Colored) {
        consecutive += 1;
      } else if (consecutive > 0) {
        c = columnClues[j].findIndex(
          (clue, k) => clue.consecutive == consecutive && k > prevC
        );
        prevC = c;
        if (c != -1) {
          columnClues[j][c].solved = true;
        }
        consecutive = 0;
      }
    }
    c = columnClues[j].findIndex(
      (clue, k) => clue.consecutive == consecutive && k > prevC
    );
    if (c != -1) {
      columnClues[j][c].solved = true;
    }
  }
  return [rowClues, columnClues];
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
  const [rowClues, columnClues] = findSolvedClues(grid, makeClues(solution));
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
                <Clue clue={hint} orientation="vertical" />
              </td>
            );
          })}
        </tr>

        {grid.map((rows, y) => {
          return (
            <tr key={y}>
              <td>
                <Clue clue={rowClues[y]} orientation="horizontal" />
              </td>

              {rows.map((cell, x) => (
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
