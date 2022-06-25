import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./Controls.scss";
import { bigIntToBase64, randomBigInt } from "../helpers";
import { clear, generate } from "./slices/grid";
import { useSearchParams } from "react-router-dom";

interface Props {
  seed: string;
  width: number;
  height: number;
}

const Controls: React.FC<Props> = (props) => {
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);
  const [seed, setSeed] = useState(props.seed);
  const didMount = useRef(false);

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
