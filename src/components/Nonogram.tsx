import React, { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { isEqual } from "lodash";
import store, { State } from "./store";

import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";
import { bigIntToBase64, createClues, randomBigInt } from "../helpers";
import { useDispatch } from "react-redux";
import { generate } from "./slices/grid";
import { useSelector } from "react-redux";

interface Props {
  seed: string;
  width: number;
  height: number;
}

const Nonogram: React.FC<Props> = ({ seed, width, height }) => {
  const grid = useSelector((state: State) => state.nonogram.grid);
  const solution = useSelector((state: State) => state.nonogram.solution);
  const dispatch = useDispatch();
  const [solved, setSolved] = useState(false);

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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
