import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";
import { bigIntToBase64, randomBigInt } from "../helpers";

interface Props {
  seed?: string;
  width: number;
  height: number;
}

const Nonogram: React.FC<Props> = ({ seed, width, height }) => {
  let s = seed || bigIntToBase64(randomBigInt(width * height));

  return (
    <Provider store={store}>
      <div className="nonogram">
        <Grid />
        <Controls seed={s} width={width} height={height} />
      </div>
    </Provider>
  );
};

export default Nonogram;
