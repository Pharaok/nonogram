import * as React from "react";
import "./Grid.scss";

type Props = {
  width: number;
  height: number;
};

const Grid: React.FC<Props> = (props) => {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${props.width}, auto)` }}
    >
      {[...Array(props.width * props.height)].map(() => {
        return <div>.</div>;
      })}
    </div>
  );
};

export default Grid;
