import React from "react";
import { createClues } from "../helpers";
import { CellState } from "./Cell";
import "./Clue.scss";

type Props = {
  cells: number[];
  solution: number[];
  orientation: "vertical" | "horizontal";
};

const Clue: React.FC<Props> = ({ cells, solution, orientation }) => {
  // Generate clues from solution
  const clues = createClues(solution);
  const currClues = createClues(cells);

  let i = -1;
  let prev = -1;
  const solved: boolean[] = [];
  currClues.forEach((clue) => {
    i = clues.indexOf(clue, prev + 1);
    if (i !== -1) {
      prev = i;
      solved[i] = true;
    }
  });

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
