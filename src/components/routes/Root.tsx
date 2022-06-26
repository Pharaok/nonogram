import React from "react";
import { Provider } from "react-redux";
import Nonogram from "../Nonogram";
import store from "../store";

const Root = () => {
  return (
    <Provider store={store}>
      <Nonogram />
    </Provider>
  );
};

export default Root;
