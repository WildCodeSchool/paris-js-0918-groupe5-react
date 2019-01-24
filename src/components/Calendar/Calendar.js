
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import PropTypes from 'prop-types';

import DialogOpener from './DialogOpener';
import './Calendar.css';

import {
  recordDateAndTime,
  openEventDialog,
  getEventList,
  getContacts,
} from '../../actions/eventActions';

// color func of category an past event
moment.locale('fr');
const localizer = BigCalendar.momentLocalizer(moment);

const getGoodFormat = date => moment(date).toISOString(true).substr(0, 19);

const refactoEventFormat = (allEvents = []) => {
  const events = [];
  allEvents.map(item => events.push({
    title: item.title,
    start: item.startingDate,
    end: item.endingDate,
    allDay: false,
  }));
  return events;
};

class Calendar extends Component {
  componentDidMount() {
    const { getEvents, getContactsList } = this.props;
    getEvents();
    getContactsList();
  }

  openDialogToCreateEvent = ({ start }) => {
    const { record, OpenDialog } = this.props;
    record(getGoodFormat(start), getGoodFormat(start));
    OpenDialog();
  }

  render() {
    const { isLoaded, events } = this.props;

    if (!isLoaded) return <p>Site en maintenance, revenez plus tard :)</p>;
    return (
      <div className="calendar">
        <BigCalendar
          views={['month', 'week', 'day']}
          defaultView="month"
          localizer={localizer}
          events={refactoEventFormat(events)}
          selectable
          onSelectEvent={() => console.log('pop-up to modify')}
          onSelectSlot={this.openDialogToCreateEvent}
          startAccessor="start"
          endAccessor="end"
        />
        <DialogOpener />
      </div>
    );
  }
}

Calendar.propTypes = {
  getEvents: PropTypes.func.isRequired,
  record: PropTypes.func.isRequired,
  OpenDialog: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  startingDate: state.event.startingDate,
  endingDate: state.event.endingDate,
  isLoaded: state.event.isLoaded,
  events: state.event.events,
  listOfcontact: state.event.listOfcontact,
});

const mapDispatchToProps = dispatch => ({
  record: (start, end) => dispatch(recordDateAndTime(start, end)),
  OpenDialog: () => dispatch(openEventDialog()),
  getEvents: () => dispatch(getEventList()),
  getContactsList: () => dispatch(getContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
