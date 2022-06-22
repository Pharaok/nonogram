import React, { MouseEventHandler } from "react";
import "./Cell.scss";

type Props = {
  onClick: MouseEventHandler;
  onContextMenu: MouseEventHandler;
  colored?: boolean;
  marked?: boolean;
};

const Cell: React.FC<Props> = ({
  onClick,
  onContextMenu,
  colored = false,
  marked = false,
}) => {
  return (
    <div
      className={`cell ${colored ? "colored" : ""} ${marked ? "marked" : ""}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    ></div>
  );
};

export default Cell;
