import React from "react";
import { createRoot } from "react-dom/client";
import { enablePatches } from "immer";
import App from "./App";
import "./index.scss";

enablePatches();

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App></App>);
