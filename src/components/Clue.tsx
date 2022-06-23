import React from "react";
import "./Clue.scss";

type Props = {
  clue: number[];
  orientation: "vertical" | "horizontal";
};

const Clue: React.FC<Props> = (props) => {
  return (
    <div className={`clue ${props.orientation}`}>
      {props.clue.map((clue, i) => {
        return <span key={i}>{clue}</span>;
      })}
    </div>
  );
};

export default Clue;
