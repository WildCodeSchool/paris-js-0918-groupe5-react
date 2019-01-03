// import axios from 'axios';
import {
  RECORD_EVENT_INFO,
  RECORD_BOOL_AT_HOME_EVENT,
  RECORD_SIMPLE_SELECT,
  RECORD_SWITCH_LABEL,
  RECORD_DATE,
  // SEND_TO_DB,
} from './types';

// const apiUrl = 'localhost:4243/calendrier';

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

// export const sendToDB = (dispatch) => {
//   axios.post(`${apiUrl}`)
//     .then(dispatch({
//       type: SEND_TO_DB,
//       data,
//     }));
// };
