import React, { useState, useMemo, Dispatch, SetStateAction } from "react";
import "./Nonogram.scss";
import Cell from "./Cell";

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

const make2DArray = (width: number, height: number): number[][] => {
  let grid = Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = Array(width);
    for (let j = 0; j < width; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
};

const set2DState = (
  state: any[][],
  setState: Dispatch<SetStateAction<any[][]>>,
  i: number,
  j: number,
  fn: Function
) => {
  setState(
    state.map((x, ii) => {
      return x.map((y, jj) => {
        if (ii === i && jj === j) {
          return fn(y);
        }
        return y;
      });
    })
  );
};

const makeHints = (grid: number[][]): number[][][] => {
  let rowHints = Array(grid.length);
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

const validateGrid = (grid: number[][], solution: number[][]): boolean => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if ((grid[i][j] & 1) != (solution[i][j] & 1)) {
        return false;
      }
    }
  }
  return true;
};

enum CellState {
  Empty,
  Colored = 1 << 0,
  Marked = 1 << 1,
}

type Props = {
  width: number;
  height: number;
};

const Nonogram: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState(make2DArray(props.width, props.height));
  const seed = useMemo(
    () => generateBigInt(props.width * props.height),
    [props]
  );
  const solution = useMemo(() => {
    return Array.from(grid, (x, i) => {
      return Array.from(x, (y, j) => {
        return Number(Boolean(seed & (1n << BigInt(i * props.width + j))));
      });
    });
  }, [seed]);
  const [rowHints, columnHints] = makeHints(solution);

  if (validateGrid(grid, solution)) {
    alert("You won!");
  }
  console.log(solution);

  return (
    <table className="nonogram">
      <tbody>
        <tr>
          <td></td>
          {columnHints.map((x, i) => {
            return <td key={i}>{x}</td>;
          })}
        </tr>

        {grid.map((x, i) => {
          return (
            <tr key={i}>
              <td>{rowHints[i]}</td>
              {x.map((y, j) => (
                <td key={j}>
                  <Cell
                    colored={Boolean(grid[i][j] & CellState.Colored)}
                    marked={Boolean(grid[i][j] & CellState.Marked)}
                    onClick={() => {
                      set2DState(
                        grid,
                        setGrid,
                        i,
                        j,
                        (x: number) => x ^ CellState.Colored
                      );
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      set2DState(
                        grid,
                        setGrid,
                        i,
                        j,
                        (x: number) => x ^ CellState.Marked
                      );
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
