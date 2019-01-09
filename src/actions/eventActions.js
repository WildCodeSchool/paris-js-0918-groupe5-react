import axios from 'axios';
import {
  RECORD_EVENT_INFO,
  RECORD_BOOL_AT_HOME_EVENT,
  RECORD_SIMPLE_SELECT,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  SEND_TO_DB,
  // GET_EVENTS_FROM_DB,
} from './types';

const apiUrl = 'http://localhost:4243/events';


export const recordAllInfo = allInfo => (dispatch) => {
  axios.post(`${apiUrl}`, allInfo)
    .then(dispatch({
      type: SEND_TO_DB,
    }));
};

export const recordTitleAndAddress = (title, address) => (dispatch) => {
  dispatch({
    type: RECORD_EVENT_INFO,
    title,
    address,
  });
};

export const recordAtHomeEvent = bool => (dispatch) => {
  dispatch({
    type: RECORD_BOOL_AT_HOME_EVENT,
    atHomeEvent: bool,
  });
};

export const recordDateAndTime = (begingDate, endingDate) => (dispatch) => {
  dispatch({
    type: RECORD_DATE,
    begingDate,
    endingDate,
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
  visibleEvent,
  followedVisit,
  reminder,
  immediateNotif,
) => (dispatch) => {
  dispatch({
    type: RECORD_SWITCH_LABEL,
    visibleEvent,
    followedVisit,
    reminder,
    immediateNotif,
  });
};
