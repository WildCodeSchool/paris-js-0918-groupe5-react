import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import eventReducer from './eventReducer';
import displayReducer from './displayReducer';

export default combineReducers({
  event: eventReducer,
  display: displayReducer,
  form: formReducer,
});
