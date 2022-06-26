import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const store = configureStore({ reducer: rootReducer });

export type NonogramState = ReturnType<typeof store.getState>;
export type NonogramDispatch = typeof store.dispatch;

export default store;
