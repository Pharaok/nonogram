import produce from "immer";
import { createClues, createGridClues } from "../helpers";

const SET_BRUSH = "SET_BRUSH";
const PAINT_CELL = "PAINT_CELL";
const CLEAR = "CLEAR";
const SET_SOLUTION = "SET_SOLUTION";
const SET_GRID = "SET_GRID";

interface SetBrushAction {
  type: typeof SET_BRUSH;
  payload: { brush: number };
}
interface PaintCellAction {
  type: typeof PAINT_CELL;
  payload: { path: [number, number]; brush: number };
}
interface setSolutionAction {
  type: typeof SET_SOLUTION;
  payload: {
    solution: number[][];
  };
}
interface setGridAction {
  type: typeof SET_GRID;
  payload: {
    grid: number[][];
  };
}
interface ClearAction {
  type: typeof CLEAR;
  payload: { brush: number };
}

interface State {
  grid: number[][];
  solution: number[][];
  clues: number[][][]; // [axis][index][clue]
  cluesFromGrid: number[][][]; // [axis][index][clue]
  brush: number;
}
const initialState: State = {
  grid: [[0]],
  solution: [[1]],
  clues: [[[1]], [[1]]],
  cluesFromGrid: [[[0]], [[0]]],
  brush: 0,
};

type Actions =
  | SetBrushAction
  | PaintCellAction
  | setSolutionAction
  | setGridAction
  | ClearAction;

export const setBrush = (brush: number) => ({
  type: SET_BRUSH,
  payload: { brush },
});
export const paintCell = (x: number, y: number, brush: number) => ({
  type: PAINT_CELL,
  payload: { path: [y, x], brush },
});
export const setSolution = (solution: number[][]) => ({
  type: SET_SOLUTION,
  payload: { solution },
});
export const setGrid = (grid: number[][]) => ({
  type: SET_GRID,
  payload: { grid },
});
export const clear = (brush: number) => ({ type: CLEAR, payload: { brush } });

const nonogram = (prevState = initialState, action: Actions) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case SET_BRUSH:
        draft.brush = action.payload.brush;
        break;
      case PAINT_CELL: {
        const [y, x] = action.payload.path;
        draft.grid[y][x] = action.payload.brush;
        draft.cluesFromGrid[0][y] = createClues(draft.grid[y]);
        draft.cluesFromGrid[1][x] = createClues(
          draft.grid.map((row) => row[x])
        );
        break;
      }
      case CLEAR:
        draft.grid = draft.grid.map((row) =>
          row.map((cell) => cell & ~action.payload.brush)
        );
        break;
      case SET_SOLUTION: {
        draft.solution = action.payload.solution;
        draft.clues = createGridClues(draft.solution);
        break;
      }
      case SET_GRID: {
        draft.grid = action.payload.grid;
        draft.cluesFromGrid = createGridClues(draft.grid);
        break;
      }
    }
  });
};

export default nonogram;
