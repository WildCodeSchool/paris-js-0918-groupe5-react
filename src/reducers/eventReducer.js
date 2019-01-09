import {
  RECORD_EVENT_TITLE,
  RECORD_EVENT_ADDRESS,
  RECORD_RESPONSIBLE,
  RECORD_FREQUENCY,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  SEND_TO_DB,
} from '../actions/types';

const initialState = {
  title: '',
  receiverAddressChecked: true,
  address: 'Receiver Address',
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
      };
    case RECORD_EVENT_ADDRESS:
      return {
        ...state,
        address: action.address,
        receiverAddressChecked: action.receiverAddressChecked,
      };
    case RECORD_RESPONSIBLE:
      return {
        ...state,
        responsible: action.responsible,
      };
    case RECORD_FREQUENCY:
      return {
        ...state,
        frequency: action.frequency,
      };
    case RECORD_DATE:
      return {
        ...state,
        begingDate: action.begingDate,
        endingDate: action.endingDate,
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
