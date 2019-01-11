import { DISPLAY_APP_BAR } from './types';

export const displayAppBar = isDisplayed => (dispatch) => {
  dispatch({
    type: DISPLAY_APP_BAR,
    isDisplayed,
  });
};
