import React, { useEffect, useMemo } from "react";
import { isEqual } from "lodash";
import { useNonogramSelector } from "./hooks";

import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";
import { createClues } from "../helpers";

const Nonogram: React.FC = () => {
  const grid = useNonogramSelector((state) => state.grid);
  const solution = useNonogramSelector((state) => state.solution);

  const [rowClues, colClues] = useMemo(
    () => [
      solution.map((row) => createClues(row)),
      solution[0].map((c, j) => createClues(solution.map((row) => row[j]))),
    ],
    [solution]
  );

  const isSolved = () => {
    return (
      isEqual(
        grid.map((row) => createClues(row)),
        rowClues
      ) &&
      isEqual(
        grid[0].map((c, j) => createClues(grid.map((row) => row[j]))),
        colClues
      )
    );
  };

  useEffect(() => {
    if (isSolved()) {
      alert("You won!");
    }
  }, [grid]);

  return (
    <div className="nonogram">
      <Grid />
      <Controls />
    </div>
  );
};

export default Nonogram;
