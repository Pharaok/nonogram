import React from "react";
import { useNonogramDispatch, useNonogramSelector } from "./hooks";
import "./Cell.scss";
import { paintCell, setBrush } from "./slices/nonogram";

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
  const cell = useNonogramSelector((state) => state.grid[y][x]);
  const colored = cell & Brushes.Colored;
  const marked = cell & Brushes.Marked;

  const dispatch = useNonogramDispatch();

  return (
    <button
      style={{
        gridArea: `${y + 2} / ${x + 2}`,
        transitionDelay: `${(x + y) * 50}ms`,
      }}
      className={`cell ${colored ? "colored" : ""} ${marked ? "marked" : ""}`}
      onTouchStart={(e) => {
        if (e.touches.length === 1) {
          const brush = (cell + 1) % 3;
          dispatch(setBrush(brush));
          dispatch(paintCell(x, y, brush));
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        let brush = 0;
        if (e.buttons & 1) {
          brush = (cell & Brushes.Colored) ^ Brushes.Colored;
        } else if (e.buttons & 2) {
          brush = (cell & Brushes.Marked) ^ Brushes.Marked;
        }
        dispatch(paintCell(x, y, brush));
        dispatch(setBrush(brush));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    ></button>
  );
};

export default Cell;
