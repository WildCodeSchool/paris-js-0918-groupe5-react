import { DISPLAY_APP_BAR, DISPLAY_DIALOG_RECEIVER } from './types';

export const displayAppBar = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_APP_BAR,
    isDisplayed,
  });
};

export const displayDialogReceiver = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_DIALOG_RECEIVER,
    isDisplayed,
  });
};
