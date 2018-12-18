import { RECORD_EVENT_INFO, RECORD_BOOL_AT_HOME_EVENT, RECORD_SIMPLE_SELECT } from '../actions/types';

const initialState = {
  titre: '',
  address: '',
  atHomeEvent: false,
  frequency: '',
  responsible: '',
  category: '',
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
      }
    default:
      return state;
  }
};
