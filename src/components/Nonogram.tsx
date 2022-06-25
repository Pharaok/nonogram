import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import "./Nonogram.scss";
import Controls from "./Controls";
import Grid from "./Grid";

interface Props {
  width: number;
  height: number;
}

const Nonogram: React.FC<Props> = ({ width, height }) => {
  return (
    <Provider store={store}>
      <div className="nonogram">
        <Grid width={width} height={height} />
        <Controls />
      </div>
    </Provider>
  );
};

export default Nonogram;
