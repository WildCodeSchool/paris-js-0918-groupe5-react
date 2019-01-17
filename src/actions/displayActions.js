import { DISPLAY_APP_BAR, DISPLAY_DIALOG_ADD_RECEIVER } from './types';

export const displayAppBar = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_APP_BAR,
    isDisplayed,
  });
};

export const displayDialogAddReceiver = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_DIALOG_ADD_RECEIVER,
    isDisplayed,
  });
};
