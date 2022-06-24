import React from "react";
import Grid from "./Grid";

type Props = {
  width: number;
  height: number;
};

const Nonogram: React.FC<Props> = (props) => {
  return (
    <div>
      <Grid width={props.width} height={props.height} />
    </div>
  );
};

export default Nonogram;
