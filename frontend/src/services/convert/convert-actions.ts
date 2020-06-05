import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { FilePickedAction, PickFileAction } from "./convert-types";
import { MediaFile } from "../../components/atoms/file";

// The type of the last action to be dispatched - will always be promise<T> for async actions
// The type for the data within the last action
// The type of the parameter for the nested function (which goes into empty parens)
// The type of the last action to be dispatched

export const pickFileThunk: ActionCreator<ThunkAction<
  Promise<FilePickedAction>,
  MediaFile,
  null,
  FilePickedAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const pickFile: PickFileAction = {
      type: "PICK_FILE",
    };

    dispatch(pickFile);

    const filePickedAction: FilePickedAction = {
      type: "FILE_PICKED",
    };

    try {
      let mediaFile: MediaFile = await (window as any).backend.pick();
      filePickedAction.mediaFile = mediaFile;
    } catch (e) {
      filePickedAction.errorType = "test";
    }

    return dispatch(filePickedAction);
  };
};
