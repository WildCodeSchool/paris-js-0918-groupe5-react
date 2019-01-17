import axios from 'axios';
import getServerAuthority from '../config/getServerAuthority';
import {
  OPEN_DIALOG_EVENT,
  RECORD_EVENT_TITLE,
  RECORD_CONTACT,
  RECORD_FREQUENCY,
  RECORD_EVENT_ADDRESS,
  RECORD_MULTIPLES_DAYS,
  RECORD_DATE,
  RECORD_CATEGORY,
  RECORD_SWITCH_LABEL,
  POST_AND_CLEAR_FIELDS,
  GET_EVENT_LIST,
} from './types';

const apiUrl = `${getServerAuthority()}/events`;


export const postAndClearFields = allInfo => (dispatch) => {
  axios.post(`${apiUrl}`, allInfo)
    .then(res => dispatch({
      type: POST_AND_CLEAR_FIELDS,
      eventAdded: res,
    }))
    .then(res => dispatch({
      type: GET_EVENT_LIST,
      events: res.eventAdded.data,
    }));
};

export const getEventList = () => (dispatch) => {
  axios.get(`${apiUrl}`)
    .then(res => dispatch({
      type: GET_EVENT_LIST,
      events: res.data,
    }));
};

export const openEventDialog = () => ({
  type: OPEN_DIALOG_EVENT,
});

export const recordTitle = title => ({
  type: RECORD_EVENT_TITLE,
  title,
});

export const recordAddress = (OtherAddressChecked, preciseAddress) => ({
  type: RECORD_EVENT_ADDRESS,
  OtherAddressChecked,
  address: preciseAddress,
});

export const recordDateAndTime = (startingDate, endingDate) => ({
  type: RECORD_DATE,
  startingDate,
  endingDate,
});

export const recordContact = contact => ({
  type: RECORD_CONTACT,
  contact,
});

export const recordCategory = category => ({
  type: RECORD_CATEGORY,
  category,
});

export const recordFrequency = frequency => ({
  type: RECORD_FREQUENCY,
  frequency,
});

export const recordMultipleDays = days => ({
  type: RECORD_MULTIPLES_DAYS,
  days,
});

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
