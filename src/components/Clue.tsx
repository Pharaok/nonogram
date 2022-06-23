import React from "react";
import { CellState } from "./Cell";
import "./Clue.scss";

type Props = {
  clue: number[];
  cells: number[];
  orientation: "vertical" | "horizontal";
};

const Clue: React.FC<Props> = (props) => {
  const solved: boolean[] = Array.from(props.clue, () => false);
  let consecutive = 0;
  let prev = -1;
  props.cells.forEach((cell) => {
    if (cell & CellState.Colored) {
      consecutive += 1;
    } else if (consecutive > 0) {
      let i = props.clue.indexOf(consecutive, prev + 1);
      if (i !== -1) {
        solved[i] = true;
        prev = i;
      }
      consecutive = 0;
    }
  });

  return (
    <div className={`clue ${props.orientation}`}>
      {props.clue.map((clue, i) => {
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
