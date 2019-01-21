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
  GET_CONTACT_LIST,
} from './types';

class Contact {
  constructor(data) {
    this.address = data.address;
    this.category = data.category;
    this.comment = data.comment;
    this.createdAt = data.createdAt;
    this.email = data.email;
    this.firstName = data.firstName;
    this.id = data.id;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.preferenceOfContact = data.preferenceOfContact;
    this.profession = data.profession;
    this.status = data.status;
    this.title = data.title;
    this.value = `${data.title} ${data.firstName} ${data.lastName}`;
    this.label = `${data.title} ${data.firstName} ${data.lastName}`;
  }
}

// eslint-disable-next-line no-undef
const token = localStorage.getItem('token');

const apiUrl = `${getServerAuthority()}/events`;

export const postAndClearFields = allInfo => (dispatch) => {
  axios({
    method: 'POST',
    url: `${apiUrl}/1`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: allInfo,
  })
    // .then(res => dispatch({
    //   type: POST_AND_CLEAR_FIELDS,
    //   eventAdded: res,
    // }))
    .then((res) => {
      console.log('SUperRES', res.data);
      dispatch({
        type: POST_AND_CLEAR_FIELDS,
        eventAdded: res.data,
      });
    });
  // .then(res => dispatch({
  //   type: GET_EVENT_LIST,
  //   events: res.eventAdded.data,
  // }));
};

export const getContacts = () => (dispatch) => {
  axios({
    method: 'GET',
    url: `${getServerAuthority()}/contacts`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(
    res => dispatch({
      type: GET_CONTACT_LIST,
      contactsList: res.data.map(item => new Contact(item)),
    }),
  );
};

export const getEventList = () => (dispatch) => {
  axios({
    method: 'GET',
    url: `${apiUrl}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => dispatch({
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
