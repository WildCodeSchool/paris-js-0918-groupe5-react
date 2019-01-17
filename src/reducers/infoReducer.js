import { GET_RECEIVERS } from '../actions/types';

const initialState = {
  receivers: [],
  selectedReceiverId: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEIVERS:
      return {
        ...state,
        receivers: action.payload.receivers,
        selectedReceiverId: action.payload.selectedReceiverId,
      };
    default:
      return state;
  }
};
