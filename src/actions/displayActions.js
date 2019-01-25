import { DISPLAY_DIALOG_RECEIVER, DISPLAY_DIALOG_DELETE_RECEIVER } from './types';

export const displayDialogReceiver = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_DIALOG_RECEIVER,
    isDisplayed,
  });
};

export const displayDialogDeleteReceiver = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_DIALOG_DELETE_RECEIVER,
    isDisplayed,
  });
};
