import { DISPLAY_DIALOG_RECEIVER, DISPLAY_DIALOG_DELETE_RECEIVER } from '../actions/types';

const initialState = {
  dialogReceiverIsDisplayed: false,
  dialogDeleteReceiverIsDisplayed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_DIALOG_RECEIVER:
      return {
        ...state,
        dialogReceiverIsDisplayed: action.isDisplayed,
      };
    case DISPLAY_DIALOG_DELETE_RECEIVER:
      return {
        ...state,
        dialogDeleteReceiverIsDisplayed: action.isDisplayed,
      };
    default:
      return state;
  }
};
