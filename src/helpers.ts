import { Brushes } from "./components/Cell";

export const randomBigInt = (size: number): bigint => {
  const seedArray = [];
  let i = size;
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

const DIGITS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
export const bigIntToBase64 = (n: bigint) => {
  let b64 = "";
  for (let i = 0; i < Math.ceil(n.toString(2).length / 6); i++) {
    b64 = DIGITS[Number((n >> BigInt(i * 6)) & 0x3fn)] + b64;
  }
  return b64;
};

export const base64ToBigInt = (s: string) => {
  let n = 0n;
  for (let i = 0; i < s.length; i++) {
    n += BigInt(Math.pow(64, i) * DIGITS.indexOf(s[s.length - i - 1]));
  }
  return n;
};

export const createClues = (cells: number[]) => {
  const clues: number[] = [];
  let consecutive = 0;
  cells.forEach((cell) => {
    if (cell & Brushes.Colored) {
      consecutive += 1;
    } else if (consecutive > 0) {
      clues.push(consecutive);
      consecutive = 0;
    }
  });
  if (!clues.length || consecutive > 0) {
    clues.push(consecutive);
  }
  return clues;
};
