import * as React from "react";
import "./Grid.scss";
import Cell from "./Cell";

type Props = {
  width: number;
  height: number;
};

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

const generateGrid = (width: number, height: number): boolean[][] => {
  let grid = Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = Array(width);
    for (let j = 0; j < width; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return grid;
};

const generateHints = (grid: boolean[][]): number[][][] => {
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
    if (consecutive > 0) {
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
    if (consecutive > 0) {
      columnHints[j].push(consecutive);
    }
  }

  return [rowHints, columnHints];
};

const Grid: React.FC<Props> = (props) => {
  // const size = props.width * props.height;
  const grid = generateGrid(props.width, props.height);
  const [rowHints, columnHints] = generateHints(grid);
  console.log(rowHints, columnHints);
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${props.width}, auto)` }}
    >
      {grid.map((x, i) => {
        return x.map((y, j) => <Cell key={i * props.width + j} />);
      })}
    </div>
  );
};

export default Grid;
