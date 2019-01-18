import { DISPLAY_APP_BAR, DISPLAY_DIALOG_RECEIVER } from '../actions/types';

const initialState = {
  appBarIsDisplayed: true,
  dialogReceiverIsDisplayed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_APP_BAR:
      return {
        ...state,
        appBarIsDisplayed: action.isDisplayed,
      };
    case DISPLAY_DIALOG_RECEIVER:
      return {
        ...state,
        dialogReceiverIsDisplayed: action.isDisplayed,
      };
    default:
      return state;
  }
};
