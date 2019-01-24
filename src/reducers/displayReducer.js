import { DISPLAY_DIALOG_RECEIVER } from '../actions/types';

const initialState = {
  dialogReceiverIsDisplayed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_DIALOG_RECEIVER:
      return {
        ...state,
        dialogReceiverIsDisplayed: action.isDisplayed,
      };
    default:
      return state;
  }
};
