import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Controls.scss";
import { bigIntToBase64, randomBigInt } from "../helpers";
import { clear, generate } from "./slices/nonogram";

const Controls: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [seed, setSeed] = useState(
    bigIntToBase64(randomBigInt(width * height))
  );
  const didMount = useRef(false);

  useEffect(() => {
    dispatch(generate(seed, height, width));
    setSearchParams({
      seed,
      width: width.toString(),
      height: height.toString(),
    });
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
    // TODO: Add button icons
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
        <div>
          <input
            type="text"
            name="seed"
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
            R
          </button>
        </div>
        <input
          type="number"
          name="width"
          value={width}
          onChange={(e) => {
            setWidth(Number(e.target.value));
          }}
          min={1}
        />
        <input
          type="number"
          name="height"
          value={height}
          onChange={(e) => {
            setHeight(Number(e.target.value));
          }}
          min={1}
        />
        <button type="submit">G</button>
      </form>
      <button
        onClick={() => {
          dispatch(clear());
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Controls;
