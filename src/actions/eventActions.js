import {
  RECORD_EVENT_INFO,
  RECORD_BOOL_AT_HOME_EVENT,
  RECORD_SIMPLE_SELECT,
  RECORD_SWITCH_LABEL,
  SEND_TO_DB,
} from './types';

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

export const recordSwitchLabels = (
  checkedA,
  checkedB,
  checkedC,
  checkedD,
) => (dispatch) => {
  dispatch({
    type: RECORD_SWITCH_LABEL,
    checkedA,
    checkedB,
    checkedC,
    checkedD,
  });
};

export const sendToDB = (dispatch) => {
  dispatch({
    type: SEND_TO_DB,
  });
};
