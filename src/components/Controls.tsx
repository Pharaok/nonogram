import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Controls.scss";
import { bigIntToBase64, randomBigInt } from "../helpers";
import { clear, generate } from "./slices/nonogram";
import { Brushes } from "./Cell";

const Controls: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [width, setWidth] = useState(Number(searchParams.get("width")) || 10);
  const [height, setHeight] = useState(
    Number(searchParams.get("height")) || 10
  );
  const [seed, setSeed] = useState(
    searchParams.get("seed") || bigIntToBase64(randomBigInt(width * height))
  );
  const didMount = useRef(false);

  useEffect(() => {
    dispatch(generate(seed, height, width));

    searchParams.set("seed", seed);
    searchParams.set("width", width.toString());
    searchParams.set("height", height.toString());
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    if (didMount.current) {
      setSeed(bigIntToBase64(randomBigInt(width * height)));
    } else {
      didMount.current = true;
    }
  }, [width, height]);

  const dispatch = useDispatch();
  return (
    <div className="controls">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(generate(seed, height, width));

          searchParams.set("seed", seed);
          searchParams.set("width", width.toString());
          searchParams.set("height", height.toString());
          setSearchParams(searchParams);
        }}
      >
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
        <button type="submit">GO</button>
      </form>
      <button
        onClick={() => {
          dispatch(clear(Brushes.All));
        }}
      >
        <span className="material-symbols-rounded">replay</span>
      </button>
    </div>
  );
};

export default Controls;
