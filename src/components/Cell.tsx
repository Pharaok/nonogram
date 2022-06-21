import React, { MouseEventHandler, useEffect, useState } from "react";
import "./Cell.scss";

type Props = {
  colored?: boolean;
  onClick: MouseEventHandler;
};

const Cell: React.FC<Props> = ({ onClick, colored = false }) => {
  return (
    <div className={`cell ${colored ? "colored" : ""}`} onClick={onClick}></div>
  );
};

export default Cell;
