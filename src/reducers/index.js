import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import eventReducer from './eventReducer';
import displayReducer from './displayReducer';
import infoReducer from './infoReducer';

export default combineReducers({
  event: eventReducer,
  display: displayReducer,
  info: infoReducer,
  form: formReducer,
});
