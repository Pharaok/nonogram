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

const Nonogram: React.FC<Props> = (props) => {
  return (
    <Provider store={store}>
      <div className="nonogram">
        <Grid />
        <Controls />
      </div>
    </Provider>
  );
};

export default Nonogram;
