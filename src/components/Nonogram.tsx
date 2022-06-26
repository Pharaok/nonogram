import React, { useEffect, useMemo } from "react";
import { useNonogramDispatch, useNonogramSelector } from "./hooks";
import { isEqual } from "lodash";

import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";
import { createClues } from "../helpers";
import { generate } from "./slices/nonogram";

interface Props {
  seed: string;
  width: number;
  height: number;
}

const Nonogram: React.FC<Props> = ({ seed, width, height }) => {
  const grid = useNonogramSelector((state) => state.grid);
  const solution = useNonogramSelector((state) => state.solution);
  const dispatch = useNonogramDispatch();

  const [rowClues, colClues] = useMemo(
    () => [
      solution.map((row) => createClues(row)),
      solution[0].map((c, j) => solution.map((row) => row[j])),
    ],
    [solution]
  );

  console.log(solution);

  useEffect(() => {
    dispatch(generate(seed, height, width));
  }, []);

  const isSolved = () => {
    return (
      isEqual(
        grid.map((row) => createClues(row)),
        rowClues
      ) &&
      isEqual(
        grid[0].map((c, j) => grid.map((row) => row[j])),
        colClues
      )
    );
  };

  useEffect(() => {
    if (isSolved()) {
      console.log("in useEffect");
      alert("You won!");
    }
  }, [grid]);

  return (
    <div className="nonogram">
      <Grid />
      <Controls seed={seed} width={width} height={height} />
    </div>
  );
};

export default Nonogram;
