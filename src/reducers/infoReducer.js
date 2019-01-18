import { GET_RECEIVERS, GET_SELECTED_RECEIVER, GET_CONTACTS } from '../actions/types';

const initialState = {
  receivers: [],
  selectedReceiverId: 0,
  selectedReceiver: null,
  contacts: [],
  events: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEIVERS:
      return {
        ...state,
        receivers: action.payload.receivers,
        selectedReceiverId: action.payload.selectedReceiverId,
      };
    case GET_SELECTED_RECEIVER:
      return {
        ...state,
        selectedReceiver: action.payload.selectedReceiver,
        contacts: action.payload.contacts,
        events: action.payload.events,
      };
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
      };
    default:
      return state;
  }
};
