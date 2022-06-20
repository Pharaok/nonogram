import React, { useEffect, useState } from "react";
import "./Cell.scss";

const Cell: React.FC = () => {
  let [colored, setColored] = useState(false);
  return (
    <div
      className={`cell ${colored ? "colored" : ""}`}
      onClick={() => {
        setColored(!colored);
      }}
    ></div>
  );
};

export default Cell;
