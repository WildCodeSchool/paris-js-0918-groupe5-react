import { RECORD_EVENT_INFO, RECORD_BOOL_AT_HOME_EVENT, RECORD_SIMPLE_SELECT } from './types';

export const recordEventInfo = (titre, address) => (dispatch) => {
  dispatch({
    type: RECORD_EVENT_INFO,
    titre,
    address,
  });
};

export const recordAtHomeEvent = bool => (dispatch) => {
  dispatch({
    type: RECORD_BOOL_AT_HOME_EVENT,
    atHomeEvent: bool,
  });
};

export const recordSimpleSelect = (frequency, responsible, category) => (dispatch) => {
  dispatch({
    type: RECORD_SIMPLE_SELECT,
    frequency,
    responsible,
    category,
  });
};
