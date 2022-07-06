import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";
import { bigIntToBase64, randomBigInt } from "../helpers";
import { useNonogramDispatch } from "./hooks";
import { generate } from "./slices/nonogram";

const Nonogram: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const width = Number(searchParams.get("width")) || 8;
  const height = Number(searchParams.get("height")) || 8;
  const seed =
    searchParams.get("seed") || bigIntToBase64(randomBigInt(width * height));

  const dispatch = useNonogramDispatch();

  useEffect(() => {
    dispatch(generate(seed, height, width));
  }, [width, height, seed]);

  return (
    <div className="nonogram">
      <Grid />
      <Controls />
    </div>
  );
};

export default Nonogram;
