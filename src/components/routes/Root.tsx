import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { bigIntToBase64, randomBigInt } from "../../helpers";
import Nonogram from "../Nonogram";

const Root = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const width = Number(searchParams.get("width")) || 10;
  const height = Number(searchParams.get("height")) || 10;
  const seed =
    searchParams.get("seed") || bigIntToBase64(randomBigInt(width * height));
  useEffect(() => {
    searchParams.set("seed", seed);
    searchParams.set("width", width.toString());
    searchParams.set("height", height.toString());
  }, []);

  return (
    <div>
      <Nonogram width={width} height={height} seed={seed} />
    </div>
  );
};

export default Root;
