export const generateBigInt = (size: number): bigint => {
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
