import axios from 'axios';
import getServerAuthority from '../config/getServerAuthority';
import { GET_RECEIVERS } from './types';

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
