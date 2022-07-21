import React from "react";
import "./Clue.scss";
import { useNonogramSelector } from "./hooks";

type Props = {
  orientation: "vertical" | "horizontal";
  index: number;
};

const Clue: React.FC<Props> = ({ orientation, index }) => {
  const clues = useNonogramSelector(
    (state) => state.clues[+(orientation === "vertical")][index]
  );
  const cluesFromGrid = useNonogramSelector(
    (state) => state.cluesFromGrid[+(orientation === "vertical")][index]
  );

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
