import { RECORD_NAME } from './types';

export const recordName = name => (dispatch) => {
  dispatch({
    type: RECORD_NAME,
    name,
  });
};
