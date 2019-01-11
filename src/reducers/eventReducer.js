import {
  RECORD_EVENT_INFO,
  RECORD_BOOL_AT_HOME_EVENT,
  RECORD_SIMPLE_SELECT,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  SEND_TO_DB,
} from '../actions/types';

const initialState = {
  title: '',
  address: '',
  atHomeEvent: true,
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

// si pas de valeur à ma state, prend la valeur d'initialstate
export default (state = initialState, action) => {
  switch (action.type) {
    case RECORD_EVENT_INFO:
      return {
        ...state,
        title: action.title,
        address: action.address,
      };
    case RECORD_BOOL_AT_HOME_EVENT:
      return {
        ...state,
        atHomeEvent: action.atHomeEvent,
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
