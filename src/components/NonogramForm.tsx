import React, { useState } from "react";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";
import { bigIntToBase64, randomBigInt } from "../helpers";
import "./NonogramForm.scss";

const NonogramForm = () => {
  const [searchParams] = useSearchParams();
  const [width, setWidth] = useState(Number(searchParams.get("width")) || 10);
  const [height, setHeight] = useState(
    Number(searchParams.get("height")) || 10
  );
  const [seed, setSeed] = useState(
    searchParams.get("seed") || bigIntToBase64(randomBigInt(width * height))
  );
  const sp = createSearchParams({
    seed,
    width: width.toString(),
    height: height.toString(),
  }).toString();
  return (
    <form id="nonogram-form">
      <div className="seed-input">
        <input
          placeholder="seed"
          value={seed}
          onChange={(e) => {
            setSeed(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setSeed(bigIntToBase64(randomBigInt(width * height)));
          }}
        >
          <span className="material-symbols-rounded">shuffle</span>
        </button>
      </div>
      <div className="size-input">
        <input
          type="number"
          placeholder="width"
          value={width}
          onChange={(e) => {
            setWidth(Math.max(1, Number(e.target.value)));
          }}
          min={1}
        />
        <span>X</span>
        <input
          type="number"
          placeholder="height"
          value={height}
          onChange={(e) => {
            setHeight(Math.max(1, Number(e.target.value)));
          }}
          min={1}
        />
      </div>
      <Link to={`/?${sp}`} className="go">
        GO
      </Link>
    </form>
  );
};

export default NonogramForm;
