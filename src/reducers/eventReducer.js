import { RECORD_NAME } from '../actions/types';

const initialState = {
  name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECORD_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};
