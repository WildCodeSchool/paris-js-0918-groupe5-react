import { GET_RECEIVERS, GET_SELECTED_RECEIVER, GET_CONTACTS } from '../actions/types';

const initialState = {
  receivers: [],
  selectedReceiverId: 0,
  selectedReceiver: null,
  contacts: [],
  events: [],
  selectedReceiverTab: 0,
};

export default (state = initialState, action) => {
  let selectedReceiverTab = 0;
  switch (action.type) {
    case GET_RECEIVERS:
      if (action.payload.receivers.length) {
        for (let i = 0; i < action.payload.receivers.length; i++) {
          const receiver = action.payload.receivers[i];
          if (receiver.id === action.payload.selectedReceiverId) {
            selectedReceiverTab = i;
          }
        }
      }
      return {
        ...state,
        receivers: action.payload.receivers,
        selectedReceiverId: action.payload.selectedReceiverId,
        selectedReceiverTab,
      };
    case GET_SELECTED_RECEIVER:
      for (let i = 0; i < state.receivers.length; i++) {
        const receiver = state.receivers[i];
        if (receiver.id === action.payload.idReceiver) {
          selectedReceiverTab = i;
        }
      }
      return {
        ...state,
        selectedReceiver: action.payload.selectedReceiver,
        contacts: action.payload.contacts,
        events: action.payload.events,
        selectedReceiverId: action.payload.idReceiver,
        selectedReceiverTab,
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
