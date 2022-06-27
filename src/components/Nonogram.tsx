import React, { useEffect, useMemo, useState } from "react";
import { isEqual } from "lodash";
import { useNonogramDispatch, useNonogramSelector } from "./hooks";

import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";
import { createClues } from "../helpers";
import { Brushes } from "./Cell";
import { clear } from "./slices/nonogram";

const Nonogram: React.FC = () => {
  const grid = useNonogramSelector((state) => state.grid);
  const solution = useNonogramSelector((state) => state.solution);
  const [solved, setSolved] = useState(false);

  const dispatch = useNonogramDispatch();

  const [rowClues, colClues] = useMemo(
    () => [
      solution.map((row) => createClues(row)),
      solution[0].map((c, j) => createClues(solution.map((row) => row[j]))),
    ],
    [solution]
  );

  useEffect(() => {
    if (
      isEqual(
        grid.map((row) => createClues(row)),
        rowClues
      ) &&
      isEqual(
        grid[0].map((c, j) => createClues(grid.map((row) => row[j]))),
        colClues
      )
    ) {
      setSolved(true);
    }
  }, [grid]);
  useEffect(() => {
    if (solved) {
      dispatch(clear(Brushes.Marked));
      alert("You won!");
    }
  }, [solved]);

  return (
    <div className="nonogram">
      <Grid readonly={solved} />
      <Controls />
    </div>
  );
};

export default Nonogram;
