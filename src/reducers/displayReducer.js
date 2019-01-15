import { DISPLAY_APP_BAR, DISPLAY_ADD_RECEIVER_DIALOG } from '../actions/types';

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
    case DISPLAY_ADD_RECEIVER_DIALOG:
      return {
        ...state,
        dialogAddReceiverIsDisplayed: action.isDisplayed,
      };
    default:
      return state;
  }
};
