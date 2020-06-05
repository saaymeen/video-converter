export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_FILTER = "SET_FILTER";

export const SELECT_FILE = "SELECT_FILE";
export const START_CONVERSION = "START_CONVERSION";

type SelectFileAction = {
  type: typeof SELECT_FILE;
};

type StartConversionAction = {
  type: typeof START_CONVERSION;
  payload: string;
};

export type ConvertActionTypes = SelectFileAction | StartConversionAction;
