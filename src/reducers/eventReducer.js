import {
  RECORD_EVENT_INFO,
  RECORD_BOOL_AT_HOME_EVENT,
  RECORD_SIMPLE_SELECT,
  RECORD_SWITCH_LABEL,
  SEND_TO_DB,
} from '../actions/types';

const initialState = {
  titre: '',
  address: '',
  atHomeEvent: true,
  frequency: '',
  responsible: '',
  category: '',
  checkedA: false,
  checkedB: false,
  checkedC: false,
  checkedD: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECORD_EVENT_INFO:
      return {
        ...state,
        titre: action.titre,
        address: action.address,
      };
    case RECORD_BOOL_AT_HOME_EVENT:
      return {
        ...state,
        atHomeEvent: action.atHomeEvent,
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
        checkedA: action.checkedA,
        checkedB: action.checkedB,
        checkedC: action.checkedC,
        checkedD: action.checkedD,
      };
    case SEND_TO_DB:
      return {
        ...state,
      };
    default:
      return state;
  }
};
