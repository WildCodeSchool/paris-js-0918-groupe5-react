import { DISPLAY_APP_BAR } from '../actions/types';

const initialState = {
  appBarIsDisplayed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_APP_BAR:
      return {
        ...state,
        appBarIsDisplayed: action.isDisplayed,
      };
    default:
      return state;
  }
};
