import { Action } from "redux";
import { MediaFile } from "../../components/atoms/file";

export interface PickFileAction extends Action<"PICK_FILE"> {}

export interface FilePickedAction extends Action<"FILE_PICKED"> {
  mediaFile?: MediaFile;
  errorType?: string;
}

export interface StartConversionAction extends Action<"START_CONVERSION"> {}

export type ConvertActions =
  | PickFileAction
  | FilePickedAction
  | StartConversionAction;

export interface ConvertState {
  readonly mediaFile: MediaFile | null;
  readonly error: string | null;
}

export const initialConvertState: ConvertState = {
  mediaFile: null,
  error: null,
};
