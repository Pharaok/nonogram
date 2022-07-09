import React, { useEffect, useRef } from "react";
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
  const cellEl: React.Ref<HTMLDivElement> = useRef(null);
  const cell = useNonogramSelector((state) => state.grid[y][x]);
  const brush = useNonogramSelector((state) => state.brush);
  const colored = cell & Brushes.Colored;
  const marked = cell & Brushes.Marked;

  const dispatch = useNonogramDispatch();

  // React 17+ registers touch events as passive
  useEffect(() => {
    cellEl.current?.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault(); // Prevent desktop events from firing.
      },
      { passive: false }
    );
  });
  useEffect(() => {
    const moveHandler = (e: TouchEvent) => {
      // WARNING: HACK AHEAD
      if (e.touches.length === 1) {
        e.preventDefault();
        const t = e.touches[0];
        const actualTarget = document.elementFromPoint(t.clientX, t.clientY);
        const m = actualTarget
          ?.getAttribute("style")
          ?.match(/grid-area:\s*(\d+)\s*\/\s*(\d+)\s*;/);
        if (m) {
          const [y, x] = m.slice(1).map((x) => Number(x) - 2);
          dispatch(paintCell(x, y, brush));
        }
      }
    };

    cellEl.current?.addEventListener("touchmove", moveHandler, {
      passive: false,
    });
    return () => {
      cellEl.current?.removeEventListener("touchmove", moveHandler);
    };
  }, [brush]);

  return (
    <div
      ref={cellEl}
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
      onMouseOver={(e) => {
        if (e.buttons) {
          dispatch(paintCell(x, y, brush));
        }
      }}
    ></div>
  );
};

export default Cell;
