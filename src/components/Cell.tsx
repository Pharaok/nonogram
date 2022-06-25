import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Cell.scss";
import { color, mark } from "./slices/grid";
import { State } from "./store";

type Props = {
  x: number;
  y: number;
};

export enum CellState {
  Empty,
  Colored = 1 << 0,
  Marked = 1 << 1,
}

const Cell: React.FC<Props> = ({ y, x }) => {
  const grid = useSelector((state: State) => state.nonogram.grid);
  const cell = grid[y][x];
  const colored = cell & CellState.Colored;
  const marked = cell & CellState.Marked;

  const dispatch = useDispatch();

  return (
    <div
      className={`cell ${colored ? "colored" : ""} ${marked ? "marked" : ""}`}
      onClick={(e) => {
        dispatch(color(y, x));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(mark(y, x));
      }}
    ></div>
  );
};

export default Cell;
