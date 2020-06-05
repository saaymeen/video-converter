import {
  ConvertState,
  ConvertActions,
  initialConvertState,
} from "./convert-types";
import { Reducer } from "redux";

const convertReducer: Reducer<ConvertState, ConvertActions> = (
  state = initialConvertState,
  action
) => {
  switch (action.type) {
    case "FILE_PICKED":
      if (action.mediaFile) {
        return { ...state, mediaFile: action.mediaFile, error: null };
      } else if (action.errorType) {
        return { ...state, mediaFile: null, error: action.errorType };
      }
      return state;

    default:
      return state;
  }
};

export default convertReducer;
