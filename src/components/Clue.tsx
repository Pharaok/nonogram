import React from "react";
import "./Clue.scss";

export type Clueee = {
  consecutive: number;
  solved: boolean;
};

type Props = {
  clue: Clueee[];
  orientation: "vertical" | "horizontal";
};

const Clue: React.FC<Props> = (props) => {
  return (
    <div className={`clue ${props.orientation}`}>
      {props.clue.map((clue, i) => {
        return (
          <span key={i} className={clue.solved ? "solved" : ""}>
            {clue.consecutive}
          </span>
        );
      })}
    </div>
  );
};

export default Clue;
