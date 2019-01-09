import axios from 'axios';
import {
  RECORD_EVENT_TITLE,
  // RECEIVER_ADDRESS_SELECTED,
  RECORD_RESPONSIBLE,
  RECORD_FREQUENCY,
  RECORD_EVENT_ADDRESS,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  SEND_TO_DB,
  // GET_EVENTS_FROM_DB,
} from './types';

const apiUrl = 'http://localhost:4244/events';


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

// export const receiverAddressChecked = receiverAddressChecked => ({
//   type: RECEIVER_ADDRESS_SELECTED,
//   receiverAddressChecked,
// });


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
