import React, { useState } from "react";
import "./Cell.scss";

const Cell: React.FC = () => {
  let [colored, setColored] = useState(false);
  return <div className="cell"></div>;
};

export default Cell;
