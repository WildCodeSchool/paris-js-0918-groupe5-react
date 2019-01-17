import { DISPLAY_APP_BAR, DISPLAY_DIALOG_ADD_RECEIVER } from '../actions/types';

const initialState = {
  appBarIsDisplayed: true,
  dialogAddReceiverIsDisplayed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_APP_BAR:
      return {
        ...state,
        appBarIsDisplayed: action.isDisplayed,
      };
    case DISPLAY_DIALOG_ADD_RECEIVER:
      return {
        ...state,
        dialogAddReceiverIsDisplayed: action.isDisplayed,
      };
    default:
      return state;
  }
};
