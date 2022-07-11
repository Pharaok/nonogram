import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";
import { base64ToBigInt, bigIntToBase64, randomBigInt } from "../helpers";
import { useNonogramDispatch } from "./hooks";
import { clear, setSolution } from "./slices/nonogram";
import { Brushes } from "./Cell";

const Nonogram: React.FC = () => {
  const [searchParams] = useSearchParams();

  const width = Number(searchParams.get("width")) || 8;
  const height = Number(searchParams.get("height")) || 8;
  const seed =
    searchParams.get("seed") || bigIntToBase64(randomBigInt(width * height));

  const dispatch = useNonogramDispatch();

  useEffect(() => {
    const solution: number[][] = [];
    for (let y = 0; y < height; y++) {
      solution.push([]);
      for (let x = 0; x < width; x++) {
        solution[y][x] = +Boolean(
          base64ToBigInt(seed) & (BigInt(1) << BigInt(y * width + x))
        );
      }
    }
    dispatch(setSolution(solution));
    dispatch(clear(Brushes.All));
  }, [width, height, seed]);

  return (
    <div className="nonogram">
      <Grid />
      <Controls />
    </div>
  );
};

export default Nonogram;
