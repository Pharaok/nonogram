import React from "react";
import { useNonogramDispatch, useNonogramSelector } from "./hooks";
import "./Cell.scss";
import { setBrush, paintCell } from "./slices/nonogram";

type Props = {
  x: number;
  y: number;
};

export enum Brushes {
  Empty,
  Colored = 1 << 0,
  Marked = 1 << 1,
}

const Cell: React.FC<Props> = ({ y, x }) => {
  const grid = useNonogramSelector((state) => state.grid);
  const cell = grid[y][x];
  const colored = cell & Brushes.Colored;
  const marked = cell & Brushes.Marked;

  const dispatch = useNonogramDispatch();

  return (
    <div
      className={`cell ${colored ? "colored" : ""} ${marked ? "marked" : ""}`}
      onMouseDown={(e) => {
        e.preventDefault();
        if (e.buttons & 1) {
          dispatch(setBrush((cell & Brushes.Colored) ^ Brushes.Colored));
        } else if (e.buttons & 2) {
          dispatch(setBrush((cell & Brushes.Marked) ^ Brushes.Marked));
        }
        dispatch(paintCell(y, x));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onMouseOver={(e) => {
        if (e.buttons) {
          dispatch(paintCell(y, x));
        }
      }}
    ></div>
  );
};

export default Cell;
