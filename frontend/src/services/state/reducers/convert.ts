import {
  START_CONVERSION,
  SELECT_FILE,
  ConvertActionTypes,
} from "../action-types";

interface ConvertState {
  selectedFile: string | null;
  progress: number | null;
  inProgress: boolean;
}

const initialState = {
  selectedFile: null,
  progress: null,
  inProgress: false,
};

export default function (state = initialState, action: ConvertActionTypes) {
  switch (action.type) {
    case START_CONVERSION: {
      console.log("starting conversion");
      return {
        ...state,
      };
    }
    case SELECT_FILE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
