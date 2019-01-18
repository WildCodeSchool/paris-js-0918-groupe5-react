import axios from 'axios';
import getServerAuthority from '../config/getServerAuthority';
import { GET_RECEIVERS, GET_SELECTED_RECEIVER, GET_CONTACTS } from './types';

const token = localStorage.getItem('token');

export const getReceivers = () => (dispatch) => {
  axios({
    method: 'GET',
    url: `${getServerAuthority()}/users/receivers`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .then(data => (
      dispatch({
        type: GET_RECEIVERS,
        payload: {
          receivers: data.receivers,
          selectedReceiverId: data.selectedReceiverId,
        },
      })
    ));
};

export const getSelectedReceiver = receiverId => (dispatch) => {
  axios({
    method: 'GET',
    url: `${getServerAuthority()}/users/selectReceiver/${receiverId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .then(data => (
      dispatch({
        type: GET_SELECTED_RECEIVER,
        payload: {
          selectedReceiver: data.receiver,
          contacts: data.contacts,
          events: data.events,
        },
      })
    ));
};

export const getContacts = () => (dispatch) => {
  axios({
    method: 'GET',
    url: `${getServerAuthority()}/contacts`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => (
      dispatch({
        type: GET_CONTACTS,
        contacts: res.data,
      })
    ));
};
