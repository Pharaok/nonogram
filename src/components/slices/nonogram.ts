import produce from "immer";
import { base64ToBigInt } from "../../helpers";

const SET_BRUSH = "SET_BRUSH";
const PAINT_CELL = "PAINT_CELL";
const CLEAR = "CLEAR";
const GENERATE = "GENERATE";

interface SetBrushAction {
  type: typeof SET_BRUSH;
  payload: number;
}
interface PaintCellAction {
  type: typeof PAINT_CELL;
  payload: [number, number];
}
interface ResizeAction {
  type: typeof GENERATE;
  payload: {
    seed: string;
    size: [number, number];
  };
}
interface ClearAction {
  type: typeof CLEAR;
}

interface State {
  grid: number[][];
  solution: number[][];
  brush: number;
}
const initialState: State = {
  grid: [[0]],
  solution: [[1]],
  brush: 0,
};

type Actions = SetBrushAction | PaintCellAction | ResizeAction | ClearAction;

export const setBrush = (b: number) => ({
  type: SET_BRUSH,
  payload: b,
});
export const paintCell = (y: number, x: number) => ({
  type: PAINT_CELL,
  payload: [y, x],
});
export const generate = (seed: string, height: number, width: number) => ({
  type: GENERATE,
  payload: { seed, size: [height, width] },
});
export const clear = () => ({ type: CLEAR });

const nonogram = (prevState = initialState, action: Actions) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case SET_BRUSH:
        draft.brush = action.payload;
        break;
      case PAINT_CELL:
        const [y, x] = action.payload;
        draft.grid[y][x] = draft.brush;
        break;
      case CLEAR:
        draft.grid.forEach((row) => {
          row.fill(0);
        });
        break;
      case GENERATE:
        const [height, width] = action.payload.size;
        const newGrid = [];
        for (let i = 0; i < height; i++) {
          newGrid.push(Array.from(Array(width), () => 0));
        }
        draft.grid = newGrid;

        draft.solution = newGrid.map((row, y) =>
          row.map((cell, x) =>
            Number(
              Boolean(
                base64ToBigInt(action.payload.seed) &
                  (1n << BigInt(y * width + x))
              )
            )
          )
        );
        break;
    }
  });
};

export default nonogram;
