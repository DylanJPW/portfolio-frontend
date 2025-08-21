import { AnyAction, configureStore, createAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import reducer from "../reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const combinedReducers = combineReducers(reducer);
export type RootState = ReturnType<typeof combinedReducers>;
const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === "state/reset") {
    state = undefined; // Reset state to initial state
  }
  return combinedReducers(state, action);
};

const store = configureStore({ reducer: rootReducer });

export const getStore = () => store;

export type AppDispatch = typeof store.dispatch;

export interface ThunkAPI {
  dispatch: AppDispatch;
  state: RootState;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const resetState = createAction<void>("state/reset");

export default getStore;