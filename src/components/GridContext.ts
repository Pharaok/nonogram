import { createContext } from "react";

const GridContext = createContext({
  grid: [[0]],
  setGrid: (g: number[][]) => {},
});

export default GridContext;
