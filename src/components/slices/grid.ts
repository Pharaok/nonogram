import produce, { applyPatches, Patch } from "immer";
import { CellState } from "../Cell";
import { base64ToBigInt } from "../../helpers";

const COLOR = "TOGGLE_COLOR";
const MARK = "TOGGLE_MARK";
const CLEAR = "CLEAR";
const GENERATE = "GENERATE";

interface ColorAction {
  type: typeof COLOR;
  payload: [number, number];
}

interface MarkAction {
  type: typeof MARK;
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
}

const initialState: State = {
  grid: [[0]],
  solution: [[1]],
};

type Actions = ColorAction | MarkAction | ResizeAction | ClearAction;

export const color = (y: number, x: number) => ({
  type: COLOR,
  payload: [y, x],
});
export const mark = (y: number, x: number) => ({
  type: MARK,
  payload: [y, x],
});
export const generate = (seed: string, height: number, width: number) => ({
  type: GENERATE,
  payload: { seed, size: [height, width] },
});
export const clear = () => ({ type: CLEAR });

const grid = (prevState = initialState, action: Actions) => {
  let [y, x] = [-1, -1];
  return produce(prevState, (draft) => {
    switch (action.type) {
      case COLOR:
        [y, x] = action.payload;
        draft.grid[y][x] =
          (draft.grid[y][x] ^ CellState.Colored) & CellState.Colored;
        break;
      case MARK:
        [y, x] = action.payload;
        draft.grid[y][x] =
          (draft.grid[y][x] ^ CellState.Marked) & CellState.Marked;
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
      default:
        break;
    }
  });
};

export default grid;
