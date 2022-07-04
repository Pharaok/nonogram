import React, { useEffect } from "react";
import { useNonogramDispatch, useNonogramSelector } from "./hooks";
import "./Cell.scss";
import { setBrush, paintCell } from "./slices/nonogram";

type Props = {
  x: number;
  y: number;
  readonly?: boolean;
};

export enum Brushes {
  Empty,
  Colored = 1 << 0,
  Marked = 1 << 1,
  All = (1 << 3) - 1,
}

const Cell: React.FC<Props> = ({ y, x, readonly = false }) => {
  const grid = useNonogramSelector((state) => state.grid);
  const brush = useNonogramSelector((state) => state.brush);
  const cell = grid[y][x];
  const colored = cell & Brushes.Colored;
  const marked = cell & Brushes.Marked;

  const dispatch = useNonogramDispatch();

  return (
    <div
      className={`cell ${colored ? "colored" : ""} ${marked ? "marked" : ""}`}
      onMouseDown={(e) => {
        if (!readonly) {
          e.preventDefault();
          let brush = 0;
          if (e.buttons & 1) {
            brush = (cell & Brushes.Colored) ^ Brushes.Colored;
          } else if (e.buttons & 2) {
            brush = (cell & Brushes.Marked) ^ Brushes.Marked;
          }
          dispatch(paintCell(x, y, brush));
          dispatch(setBrush(brush));
        }
      }}
      onContextMenu={(e) => {
        if (!readonly) {
          e.preventDefault();
        }
      }}
      onMouseOver={(e) => {
        if (!readonly) {
          if (e.buttons) {
            dispatch(paintCell(x, y, brush));
          }
        }
      }}
    ></div>
  );
};

export default Cell;
