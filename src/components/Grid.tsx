import React, { useContext, useMemo, useState } from "react";
import produce from "immer";
import "./Grid.scss";
import GridContext from "./GridContext";
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
  gridState: [number[][], React.Dispatch<React.SetStateAction<number[][]>>];
};

const Grid: React.FC<Props> = (props) => {
  const { grid, setGrid } = useContext(GridContext);
  const height = grid.length;
  const width = grid[0].length;

  // Generate solution
  const [seed, setSeed] = useState(generateBigInt(width * height));
  const solution = useMemo(
    () =>
      grid.map((row, y) =>
        row.map((cell, x) =>
          Number(Boolean(seed & (1n << BigInt(y * width + x))))
        )
      ),
    [seed]
  );

  // if (validateGrid(grid, solution)) {
  //   alert("You won!");
  // }

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
                  <Cell
                    cell={grid[y][x]}
                    setCell={(v: number) => {
                      setGrid(
                        produce(grid, (grid) => {
                          grid[y][x] = v;
                        })
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

export default Grid;
