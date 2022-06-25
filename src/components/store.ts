import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({ reducer: rootReducer });

export type State = ReturnType<typeof store.getState>;

export default store;
