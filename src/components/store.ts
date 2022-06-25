import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const store = configureStore({ reducer: rootReducer });

export type State = ReturnType<typeof store.getState>;

export default store;
