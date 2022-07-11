import React, { useState } from "react";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { bigIntToBase64, randomBigInt } from "../helpers";
import "./NonogramForm.scss";

const NonogramForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(searchParams.get("width") ?? "8");
  const [height, setHeight] = useState(searchParams.get("height") ?? "8");
  const [seed, setSeed] = useState(searchParams.get("seed") ?? "");
  return (
    <form
      id="nonogram-form"
      onSubmit={(e) => {
        e.preventDefault();

        const sp = createSearchParams({
          seed,
          width,
          height,
        }).toString();
        navigate(`/?${sp}`);
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
            setSeed(bigIntToBase64(randomBigInt(+width * +height)));
          }}
        >
          <span className="material-symbols-rounded">shuffle</span>
        </button>
      </div>
      <div className="size-input">
        <input
          type="number"
          placeholder="width"
          required
          min={1}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <span>X</span>
        <input
          type="number"
          placeholder="height"
          required
          min={1}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <button className="submit-button">GO</button>
    </form>
  );
};

export default NonogramForm;
