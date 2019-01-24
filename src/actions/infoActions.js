import axios from 'axios';
import getServerAuthority from '../config/getServerAuthority';
import {
  GET_RECEIVERS,
  GET_SELECTED_RECEIVER,
  GET_CONTACTS,
  LOG_OUT,
} from './types';

export const getReceivers = () => (dispatch) => {
  const token = localStorage.getItem('token');
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
  const token = localStorage.getItem('token');
  if (receiverId === 0) {
    dispatch({
      type: GET_SELECTED_RECEIVER,
      payload: {
        selectedReceiver: {},
        contacts: [],
        events: [],
        idReceiver: receiverId,
      },
    });
  } else {
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
            idReceiver: receiverId,
          },
        })
      ));
  }
};

export const getContacts = () => (dispatch) => {
  const token = localStorage.getItem('token');
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

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
