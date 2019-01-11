import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
<<<<<<< HEAD
import OpenDialog from './OpenDialog';
import './style/Calendar.css';
=======
import getServerAuthority from '../../config/getServerAuthority';
import DialogToCreateEvent from './DialogToCreateEvent';
import './Calendar.css';
// import myEventsList from '../../enventsTestList';
>>>>>>> 8a540099b3ec887c6d9ab5ae8e87fbc463f74ea6

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  state = {
    openDialog: false,
    startingDate: '',
    isLoaded: false,
    allEvents: [],
  };

  componentDidMount() {
<<<<<<< HEAD
    const apiUrl = 'http://localhost:4244/events';
=======
    const apiUrl = `${getServerAuthority()}/events`;
>>>>>>> 8a540099b3ec887c6d9ab5ae8e87fbc463f74ea6
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
      // allEvents,
    } = this.state;

<<<<<<< HEAD
    if (!isLoaded) return <p>ça a pas chargé !!!!!!!</p>;
    const eventsList = [];
    allEvents.map(item => eventsList.push({
      title: item.title,
      start: item.begingDate,
      end: item.endingDate,
      allDay: true,
    }));

=======
    if (!isLoaded) return <p>ça a pas charger !!!!!!!</p>;
    const testevents = [
      {
        title: 'myfirst event',
        start: new Date(),
        end: new Date(),
        allDay: false,
      }
    ];
    // console.log('=======================');
    // console.log('allEvents ', allEvents);
    // console.log('testevents', testevents);
    // console.log('=======================');
>>>>>>> 8a540099b3ec887c6d9ab5ae8e87fbc463f74ea6
    return (
      <div className="calendar">
        {/* <GetEventList /> */}
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
