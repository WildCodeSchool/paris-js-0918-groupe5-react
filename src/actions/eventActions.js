import axios from 'axios';
import getServerAuthority from '../config/getServerAuthority';
import {
  RECORD_EVENT_TITLE,
  RECORD_RESPONSIBLE,
  RECORD_FREQUENCY,
  RECORD_EVENT_ADDRESS,
  RECORD_MULTIPLES_DAYS,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  SEND_TO_DB,
} from './types';

<<<<<<< HEAD
const apiUrl = 'http://localhost:4244/events';
=======
const apiUrl = `${getServerAuthority()}/events`;
>>>>>>> 8a540099b3ec887c6d9ab5ae8e87fbc463f74ea6


export const recordAllInfo = allInfo => (dispatch) => {
  axios.post(`${apiUrl}`, allInfo)
    .then(dispatch({
      type: SEND_TO_DB,
    }));
};

export const recordTitle = title => ({
  type: RECORD_EVENT_TITLE,
  title,
});

export const recordAddress = (receiverAddressChecked, preciseAddress) => ({
  type: RECORD_EVENT_ADDRESS,
  receiverAddressChecked,
  address: preciseAddress,
});

export const recordDateAndTime = (begingDate, endingDate) => (dispatch) => {
  dispatch({
    type: RECORD_DATE,
    begingDate,
    endingDate,
  });
};

export const recordResponsible = responsible => ({
  type: RECORD_RESPONSIBLE,
  responsible,
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
