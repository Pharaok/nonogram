import produce, { applyPatches, Patch } from "immer";
import { CellState } from "../Cell";
import { base64ToBigInt } from "../../helpers";

const TOGGLE_COLOR = "TOGGLE_COLOR";
const CLEAR = "CLEAR";
const GENERATE = "GENERATE";

interface ToggleColoredAction {
  type: typeof TOGGLE_COLOR;
  payload: [number, number];
}

interface ClearAction {
  type: typeof CLEAR;
}

interface ResizeAction {
  type: typeof GENERATE;
  payload: {
    seed: string;
    size: [number, number];
  };
}

interface State {
  grid: number[][];
  solution: number[][];
}

const initialState: State = {
  grid: [[0]],
  solution: [[1]],
};

type Actions = ClearAction | ToggleColoredAction | ResizeAction;

export const clear = () => ({ type: CLEAR });
export const toggleColor = (y: number, x: number) => ({
  type: TOGGLE_COLOR,
  payload: [y, x],
});
export const generate = (seed: string, height: number, width: number) => ({
  type: GENERATE,
  payload: { seed, size: [height, width] },
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
