import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Allow Redux to know the types of objects returned by useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
