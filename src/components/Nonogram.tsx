import React, { useState } from "react";
import Controls from "./Controls";
import Grid from "./Grid";
import GridContext from "./GridContext";

type Props = {
  width: number;
  height: number;
};

const Nonogram: React.FC<Props> = (props) => {
  const [grid, setGrid] = useState(() => {
    let rows = [];
    for (let i = 0; i < props.height; i++) {
      rows.push(Array.from(Array(props.width), () => 0));
    }
    return rows;
  });

  return (
    <GridContext.Provider value={{ grid, setGrid }}>
      <div>
        <Grid gridState={[grid, setGrid]} />
        <Controls></Controls>
      </div>
    </GridContext.Provider>
  );
};

export default Nonogram;
