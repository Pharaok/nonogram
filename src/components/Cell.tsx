import React from "react";
import "./Cell.scss";

type Props = {
  cell: number;
  setCell: (v: number) => void;
};

export enum CellState {
  Empty,
  Colored = 1 << 0,
  Marked = 1 << 1,
}

const Cell: React.FC<Props> = (props) => {
  const colored = props.cell & CellState.Colored;
  const marked = props.cell & CellState.Marked;
  return (
    <div
      className={`cell ${colored ? "colored" : ""} ${marked ? "marked" : ""}`}
      onClick={(e) => {
        props.setCell(colored ^ CellState.Colored);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        props.setCell(marked ^ CellState.Marked);
      }}
    ></div>
  );
};

export default Cell;
