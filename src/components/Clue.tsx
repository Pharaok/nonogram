import React from "react";
import { createClues } from "../helpers";
import "./Clue.scss";
import { useNonogramSelector } from "./hooks";

type Props = {
  cells: number[];
  index: number;
  orientation: "vertical" | "horizontal";
};

const Clue: React.FC<Props> = ({ cells, index, orientation }) => {
  const clues = useNonogramSelector(
    (state) => state.clues[+(orientation === "vertical")][index]
  );
  const cluesFromGrid = createClues(cells);

  let i = -1;
  let prev = -1;
  const solved: boolean[] = [];
  cluesFromGrid.forEach((clue) => {
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
