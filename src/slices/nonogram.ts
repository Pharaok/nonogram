import produce from "immer";
import { createClues } from "../helpers";

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
  clues: number[][][];
  brush: number;
}
const initialState: State = {
  grid: [[0]],
  solution: [[1]],
  clues: [[[1]], [[1]]],
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
        break;
      }
      case CLEAR:
        draft.grid = draft.grid.map((row) =>
          row.map((cell) => cell & ~action.payload.brush)
        );
        break;
      case SET_SOLUTION: {
        const height = action.payload.solution.length;
        const width = action.payload.solution[0].length;
        if (height !== draft.grid.length || width !== draft.grid[0].length) {
          const newGrid = [];
          for (let i = 0; i < height; i++) {
            newGrid.push(Array.from(Array(width), () => 0));
          }
          draft.grid = newGrid;
        }

        draft.solution = action.payload.solution;
        draft.clues = [
          draft.solution.map((row) => createClues(row)),
          draft.solution[0].map((cell, x) =>
            createClues(draft.solution.map((row) => row[x]))
          ),
        ];
        break;
      }
      case SET_GRID: {
        draft.grid = action.payload.grid;
        const height = action.payload.grid.length;
        const width = action.payload.grid[0].length;
        if (
          height !== draft.solution.length ||
          width !== draft.solution[0].length
        ) {
          const newSolution = [];
          for (let i = 0; i < height; i++) {
            newSolution.push(Array.from(Array(width), () => 0));
          }
        }
        break;
      }
    }
  });
};

export default nonogram;
