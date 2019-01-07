
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import DialogToCreateEvent from './DialogToCreateEvent';
import './Calendar.css';
import myEventsList from '../../enventsTestList';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  state = {
    openDialog: false,
    startingDate: '',
  };

  componentDidMount() {
    const apiUrl = 'http://localhost:4243/events';
    axios.get(`${apiUrl}`)
      .then(res => this.setState({
        isLoaded: true,
        allEvents: res.data,
      }));
  }

  // start in an object of bigcalendar (it provide the date clicked)
  // on closing dialog, there were a bug (sart undifined)
  // I fix it thanks default value (idem line 45)
  // It sucks I know, and it would be better using store for these dates
  openDialogToCreateEvent = ({ start } = new Date()) => {
    const { openDialog } = this.state;
    this.setState({
      openDialog: !openDialog,
      startingDate: start,
      isLoaded: false,
      allEvents: [],
    });
  }

  render() {
    const {
      openDialog,
      startingDate,
      isLoaded,
      allEvents,
    } = this.state;
    console.log(allEvents);

    if (!isLoaded) return <p>ça a pas charger !!!!!!!</p>;
    return (
      <div className="toto">
        {/* <GetEventList /> */}
        <BigCalendar
          views={['month', 'week', 'day']}
          defaultView="month"
          localizer={localizer}
          events={myEventsList}
          selectable
          onSelectEvent={() => console.log('pop-up to modify')}
          onSelectSlot={this.openDialogToCreateEvent}
        />
        <DialogToCreateEvent
          onOpen={() => this.openDialogToCreateEvent()}
          openOrNot={openDialog}
          startingDate={startingDate || new Date()}
        />
      </div>
    );
  }
}

export default Calendar;
