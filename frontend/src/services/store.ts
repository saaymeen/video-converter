import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import {
	useSelector as useReduxSelector,
	TypedUseSelectorHook,
  } from 'react-redux'

import convertReducer from "./convert/convert-reducer";
import { ConvertState } from "./convert/convert-types";

const rootReducer = combineReducers({
  convert: convertReducer,
  a: (state = { a: "" }) => state,
});

export interface AppState {
  readonly convert: ConvertState;
}

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;