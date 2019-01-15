import { DISPLAY_APP_BAR, DISPLAY_ADD_RECEIVER_DIALOG } from './types';

export const displayAppBar = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_APP_BAR,
    isDisplayed,
  });
};

export const displayAddReceiverDialog = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_ADD_RECEIVER_DIALOG,
    isDisplayed,
  });
};
