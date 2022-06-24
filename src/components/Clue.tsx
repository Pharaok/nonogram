import React from "react";
import { CellState } from "./Cell";
import "./Clue.scss";

type Props = {
  cells: number[];
  solution: number[];
  orientation: "vertical" | "horizontal";
};

const Clue: React.FC<Props> = ({ cells, solution, orientation }) => {
  // Generate clues from solution
  const clues: number[] = [];
  let consecutive = 0;
  solution.forEach((cell) => {
    if (cell & CellState.Colored) {
      consecutive += 1;
    } else if (consecutive > 0) {
      clues.push(consecutive);
      consecutive = 0;
    }
  });
  if (!clues.length || consecutive > 0) {
    clues.push(consecutive);
  }

  const solved: boolean[] = Array.from(clues, () => false);
  consecutive = 0;
  let prev = -1;
  cells.forEach((cell) => {
    if (cell & CellState.Colored) {
      consecutive += 1;
    } else if (consecutive > 0) {
      let i = clues.indexOf(consecutive, prev + 1);
      if (i !== -1) {
        solved[i] = true;
        prev = i;
      }
      consecutive = 0;
    }
  });
  let i = clues.indexOf(consecutive, prev + 1);
  if (i !== -1) {
    solved[i] = true;
  }

  return (
    <div className={`clue ${orientation}`}>
      {clues.map((clue, i) => {
        return (
          <span key={i} className={solved[i] ? "solved" : ""}>
            {clue}
          </span>
        );
      })}
    </div>
  );
};

export default Clue;
