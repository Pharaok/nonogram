import * as React from "react";
import "./Grid.scss";
import Cell from "./Cell";

type Props = {
  width: number;
  height: number;
};

const generateBigInt = (s: number): BigInt => {
  const seedArray = [];
  let i = s;
  while (i > 0) {
    let b = Math.min(i, 15);
    seedArray.push(
      Math.floor(Math.random() * Math.pow(2, b))
        .toString(2)
        .padStart(b, "0")
    );
    i -= b;
  }
  return BigInt("0b" + seedArray.join(""));
};

const Grid: React.FC<Props> = (props) => {
  const size = props.width * props.height;
  const seed = generateBigInt(size);

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${props.width}, auto)` }}
    >
      {seed
        .toString(2)
        .padStart(size, "0")
        .split("")
        .map((x, i) => {
          return <Cell key={i} />;
        })}
    </div>
  );
};

export default Grid;
