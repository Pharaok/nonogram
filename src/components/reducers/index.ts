import { combineReducers } from "redux";
import grid from "./grid";

const rootReducer = combineReducers({ nonogram: grid });

export default rootReducer;
