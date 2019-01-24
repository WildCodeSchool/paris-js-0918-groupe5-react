/* eslint no-case-declarations: 0 */
import {
  GET_RECEIVERS,
  GET_SELECTED_RECEIVER,
  GET_CONTACTS,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  receivers: [],
  selectedReceiverId: -1,
  selectedReceiver: null,
  contacts: [],
  events: [],
  selectedReceiverTab: 0,
};

const getSelectedReceiverTab = (receivers, selectedReceiverId) => {
  let selectedReceiverTab = 0;
  for (let i = 0; i < receivers.length; i++) {
    const receiver = receivers[i];
    if (receiver.id === selectedReceiverId) {
      selectedReceiverTab = i;
      break;
    }
  }
  return selectedReceiverTab;
};

export default (state = initialState, action) => {
  let selectedReceiverTab = 0;
  switch (action.type) {
    case GET_RECEIVERS:
      selectedReceiverTab = action.payload.receivers.length
        ? getSelectedReceiverTab(action.payload.receivers, action.payload.selectedReceiverId)
        : 0;
      return {
        ...state,
        receivers: action.payload.receivers,
        selectedReceiverId: action.payload.selectedReceiverId,
        selectedReceiverTab,
      };
    case GET_SELECTED_RECEIVER:
      selectedReceiverTab = getSelectedReceiverTab(state.receivers, action.payload.idReceiver);
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
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
