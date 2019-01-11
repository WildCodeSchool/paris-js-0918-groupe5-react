import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import OpenDialog from './OpenDialog';
import getServerAuthority from '../../config/getServerAuthority';
import './style/Calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  state = {
    openDialog: false,
    startingDate: '',
    isLoaded: false,
    allEvents: [],
  };

  componentDidMount() {
    const apiUrl = `${getServerAuthority()}/events`;
    axios.get(`${apiUrl}`)
      .then(res => this.setState({
        isLoaded: true,
        allEvents: res.data,
      }));
  }

  // start in an object of bigcalendar (it provide the date clicked)
  // on closing dialog, there were a bug (sart undifined)
  // I fix it thanks default value (idem line 73)
  // It sucks I know, and it would be better using store for these dates
  openDialogToCreateEvent = ({ start } = new Date()) => {
    const { openDialog } = this.state;
    this.setState({
      openDialog: !openDialog,
      startingDate: start,
    });
  }

  render() {
    const {
      openDialog,
      startingDate,
      isLoaded,
      allEvents,
    } = this.state;

    if (!isLoaded) return <p>ça a pas chargé !!!!!!!</p>;
    const eventsList = [];
    allEvents.map(item => eventsList.push({
      title: item.title,
      start: item.begingDate,
      end: item.endingDate,
      allDay: true,
    }));

    return (
      <div className="calendar">
        <BigCalendar
          views={['month', 'week', 'day']}
          defaultView="month"
          localizer={localizer}
          events={eventsList}
          selectable
          onSelectEvent={() => console.log('pop-up to modify')}
          onSelectSlot={this.openDialogToCreateEvent}
        />
        <OpenDialog
          onOpen={() => this.openDialogToCreateEvent()}
          openOrNot={openDialog}
          startingDate={startingDate || new Date()}
        />
      </div>
    );
  }
}

export default Calendar;
