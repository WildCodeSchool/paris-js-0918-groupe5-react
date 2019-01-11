import axios from 'axios';
import getServerAuthority from '../config/getServerAuthority';
import {
  OPEN_DIALOG_EVENT,
  RECORD_EVENT_TITLE,
  RECORD_RESPONSIBLE,
  RECORD_FREQUENCY,
  RECORD_EVENT_ADDRESS,
  RECORD_MULTIPLES_DAYS,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  SEND_TO_DB,
} from './types';

const apiUrl = `${getServerAuthority()}/events`;


export const recordAllInfo = allInfo => (dispatch) => {
  axios.post(`${apiUrl}`, allInfo)
    .then(dispatch({
      type: SEND_TO_DB,
    }));
};

export const openEventDialog = () => ({
  type: OPEN_DIALOG_EVENT,
});

export const recordTitle = title => ({
  type: RECORD_EVENT_TITLE,
  title,
});

export const recordAddress = (receiverAddressChecked, preciseAddress) => ({
  type: RECORD_EVENT_ADDRESS,
  receiverAddressChecked,
  address: preciseAddress,
});

// export const recordDateAndTime = (begingDate, endingDate) => (dispatch) => {
//   dispatch({
//     type: RECORD_DATE,
//     begingDate,
//     endingDate,
//   });
// };

export const recordDateAndTime = (startingDate, endingDate) => ({
  type: RECORD_DATE,
  startingDate,
  endingDate,
});

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
