import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { bigIntToBase64, randomBigInt } from "../../helpers";
import Nonogram from "../Nonogram";
import store from "../store";

const Root = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const width = Number(searchParams.get("width")) || 10;
  const height = Number(searchParams.get("height")) || 10;
  const seed =
    searchParams.get("seed") || bigIntToBase64(randomBigInt(width * height));
  useEffect(() => {
    setSearchParams({
      seed,
      width: width.toString(),
      height: height.toString(),
    });
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Nonogram width={width} height={height} seed={seed} />
      </div>
    </Provider>
  );
};

export default Root;
