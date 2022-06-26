import { useSelector } from "react-redux";
import { useDispatch, TypedUseSelectorHook } from "react-redux";
import { NonogramDispatch, NonogramState } from "./store";

export const useNonogramDispatch: () => NonogramDispatch = useDispatch;
export const useNonogramSelector: TypedUseSelectorHook<NonogramState> =
  useSelector;
