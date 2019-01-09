import {
  RECORD_EVENT_TITLE,
  RECEIVER_ADDRESS_SELECTED,
  RECORD_EVENT_ADDRESS,
  RECORD_SIMPLE_SELECT,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  SEND_TO_DB,
} from '../actions/types';

const initialState = {
  title: '',
  receiverAddressChecked: true,
  address: '',
  begingDate: '',
  endingDate: '',
  frequency: '',
  responsible: '',
  category: '',
  visibleEvent: false,
  followedVisit: false,
  reminder: false,
  immediateNotif: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECORD_EVENT_TITLE:
      return {
        ...state,
        title: action.title,
        // address: action.address,
      };
    case RECEIVER_ADDRESS_SELECTED:
      return {
        ...state,
        receiverAddressChecked: action.receiverAddressChecked,
        address: 'Receiver Address',
      };
    case RECORD_EVENT_ADDRESS:
      return {
        ...state,
        address: action.address,
        receiverAddressChecked: false,
      };

    case RECORD_DATE:
      return {
        ...state,
        begingDate: action.begingDate,
        endingDate: action.endingDate,
      };
    case RECORD_SIMPLE_SELECT:
      return {
        ...state,
        frequency: action.frequency,
        responsible: action.responsible,
        category: action.category,
      };
    case RECORD_SWITCH_LABEL:
      return {
        ...state,
        visibleEvent: action.visibleEvent,
        followedVisit: action.followedVisit,
        reminder: action.reminder,
        immediateNotif: action.immediateNotif,
      };
    case SEND_TO_DB:
      return {
        ...state,
      };
    default:
      return state;
  }
};
