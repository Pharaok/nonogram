import produce, { applyPatches, Patch } from "immer";
import { CellState } from "../Cell";
import { generateBigInt } from "../helpers";

const TOGGLE_COLOR = "TOGGLE_COLOR";
const CLEAR = "CLEAR";
const RESIZE = "RESIZE";

interface ToggleColoredAction {
  type: typeof TOGGLE_COLOR;
  payload: [number, number];
}

interface ClearAction {
  type: typeof CLEAR;
}

interface ResizeAction {
  type: typeof RESIZE;
  payload: [number, number];
}

interface State {
  grid: number[][];
  solution: number[][];
}

const initialState: State = {
  grid: [[0]],
  solution: [[0]],
};

type Actions = ClearAction | ToggleColoredAction | ResizeAction;

export const clear = () => ({ type: CLEAR });
export const toggleColor = (y: number, x: number) => ({
  type: TOGGLE_COLOR,
  payload: [y, x],
});
export const resize = (height: number, width: number) => ({
  type: RESIZE,
  payload: [height, width],
});

const grid = (prevState = initialState, action: Actions) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case TOGGLE_COLOR:
        const [y, x] = action.payload;
        draft.grid[y][x] = draft.grid[y][x] ^ CellState.Colored;
        break;
      case CLEAR:
        draft.grid.forEach((row) => {
          row.fill(0);
        });
        break;
      case RESIZE:
        const [height, width] = action.payload;
        const newGrid = [];
        for (let i = 0; i < height; i++) {
          newGrid.push(Array.from(Array(width), () => 0));
        }
        draft.grid = newGrid;

        const seed = generateBigInt(width * height);
        draft.solution = newGrid.map((row, y) =>
          row.map((cell, x) =>
            Number(Boolean(seed & (1n << BigInt(y * width + x))))
          )
        );
      default:
        break;
    }
  });
};

export default grid;
