import {
  OPEN_DIALOG_EVENT,
  RECORD_EVENT_TITLE,
  RECORD_EVENT_ADDRESS,
  RECORD_CONTACT,
  RECORD_CATEGORY,
  RECORD_FREQUENCY,
  RECORD_MULTIPLES_DAYS,
  RECORD_DATE,
  RECORD_SWITCH_LABEL,
  POST_AND_CLEAR_FIELDS,
  GET_EVENT_LIST,
} from '../actions/types';

const initialState = {
  isOpen: false,
  title: '',
  OtherAddressChecked: false,
  address: '34 avenue de la Republique', // sould be fetch from server
  startingDate: '',
  endingDate: '',
  frequency: '',
  daysSelected: '',
  contact: '',
  category: '',
  listOfcontact: ['grey', 'jackson', 'jolivet'], // sould be fetch from server
  listOfCategories: ['medical', 'nurse', 'family'],
  listOfFrequency: ['once', 'everyday', 'everyWeekDay', 'specificDays'],
  events: [],
  isLoaded: false,
  visibleEvent: false,
  followedVisit: false,
  reminder: false,
  immediateNotif: false,
};

// si pas de valeur à ma state, prend la valeur d'initialstate
export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG_EVENT:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case RECORD_EVENT_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case RECORD_EVENT_ADDRESS:
      return {
        ...state,
        address: action.address,
        OtherAddressChecked: action.OtherAddressChecked,
      };
    case RECORD_CONTACT:
      return {
        ...state,
        contact: action.contact,
      };
    case RECORD_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case RECORD_FREQUENCY:
      return {
        ...state,
        frequency: action.frequency,
      };
    case RECORD_MULTIPLES_DAYS:
      return {
        ...state,
        daysSelected: action.days,
      };
    case RECORD_DATE:
      return {
        ...state,
        startingDate: action.startingDate,
        endingDate: action.endingDate,
      };
    case POST_AND_CLEAR_FIELDS:
      return {
        ...state,
        isOpen: false,
        title: '',
        OtherAddressChecked: false,
        address: '34 avenue de la Republique',
        startingDate: '',
        endingDate: '',
        frequency: '',
        contact: '',
        category: '',
      };
    case GET_EVENT_LIST:
      return {
        ...state,
        events: state.events.concat(action.events),
        // events: action.events,
        isLoaded: true,
      };
    case RECORD_SWITCH_LABEL:
      return {
        ...state,
        visibleEvent: action.visibleEvent,
        followedVisit: action.followedVisit,
        reminder: action.reminder,
        immediateNotif: action.immediateNotif,
      };
    default:
      return state;
  }
};
