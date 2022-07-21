import React, { useEffect, useMemo, useRef } from "react";
import { isEqual, zip } from "lodash-es";
import { useNonogramDispatch, useNonogramSelector } from "./hooks";

import "./Grid.scss";
import Cell from "./Cell";
import Clue from "./Clue";
import { paintCell } from "../slices/nonogram";

const posFromClient = (clientX: number, clientY: number) => {
  const target = document.elementFromPoint(clientX, clientY);
  const m = target
    ?.getAttribute("style")
    ?.match(/grid-area:\s*(\d+)\s*\/\s*(\d+)\s*;/);
  if (m) {
    return m
      .slice(1)
      .map((x) => Number(x) - 2)
      .reverse() as [number, number];
  }
};

const Grid: React.FC = () => {
  const gridEl: React.Ref<HTMLDivElement> = useRef(null);
  const grid = useNonogramSelector((state) => state.grid);
  const solution = useNonogramSelector((state) => state.solution);
  const clues = useNonogramSelector((state) => state.clues);
  const cluesFromGrid = useNonogramSelector((state) => state.cluesFromGrid);
  const brush = useNonogramSelector((state) => state.brush);
  const solved = useMemo(
    () => isEqual(cluesFromGrid, clues),
    [cluesFromGrid, clues]
  );
  const dispatch = useNonogramDispatch();

  const firstPos = useRef<[number, number]>([-1, -1]);
  const direction = useRef<number | null>(null);

  const width = grid[0].length;
  const height = grid.length;
  const l = 60 / Math.max(width, height);

  const moveHandler = (clientX: number, clientY: number, brush: number) => {
    const pos = posFromClient(clientX, clientY);
    if (pos) {
      if (
        !isEqual(pos, firstPos.current) &&
        zip(pos, firstPos.current).some((v) => v[0] === v[1]) &&
        direction.current === null
      ) {
        zip(firstPos.current, pos).forEach((v, i) => {
          if (v[0] !== v[1]) {
            direction.current = i;
          }
        });
      } else if (direction.current !== null) {
        pos[+!direction.current] = firstPos.current[+!direction.current];
        const [start, stop] = [
          pos[direction.current],
          firstPos.current[direction.current],
        ].sort();
        for (let i = start; i <= stop; i++) {
          pos[direction.current] = i;
          if (grid[pos[1]][pos[0]] !== brush) {
            dispatch(paintCell(pos[0], pos[1], brush));
          }
        }
      }
    }
  };

  useEffect(() => {
    const touchMoveHandler = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        moveHandler(e.touches[0].clientX, e.touches[0].clientY, brush);
      }
    };
    gridEl.current?.addEventListener("touchmove", touchMoveHandler, {
      passive: false,
    });
    return () => {
      gridEl.current?.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [brush]);

  useEffect(() => {
    gridEl.current?.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
  }, []);

  return (
    <div
      ref={gridEl}
      className={`grid ${solved ? "solved" : ""}`}
      style={{
        gridTemplateColumns: `auto repeat(${width}, ${l}vmin)`,
        gridTemplateRows: `auto repeat(${height}, ${l}vmin)`,
      }}
      onMouseDown={(e) => {
        const pos = posFromClient(e.clientX, e.clientY);
        if (pos) {
          firstPos.current = pos;
          direction.current = null;
        }
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        const pos = posFromClient(t.clientX, t.clientY);
        if (pos) {
          firstPos.current = pos;
          direction.current = null;
        }
      }}
      onMouseMove={(e) => {
        if (e.buttons) {
          moveHandler(e.clientX, e.clientY, brush);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div></div>
      {grid[0].map((cell, x) => (
        <Clue orientation="vertical" index={x} key={x} />
      ))}
      {grid.map((row, y) => (
        <React.Fragment key={y}>
          <Clue orientation="horizontal" index={y} />
          {row.map((cell, x) => (
            <Cell x={x} y={y} readonly={solved} key={x} />
          ))}
        </React.Fragment>
      ))}
      <svg
        className="background"
        style={{ gridArea: `2 / 2 / ${2 + height} / ${2 + width}` }}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {solution.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <rect x={x} y={y} width={1} height={1} key={`${x}-${y}`} />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};

export default Grid;
