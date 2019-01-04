
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Button from './Button';
import DialogEvent from './DialogEvent';
import './Calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);
const myEventsList = [
  {
    title: 'myfirst event',
    start: new Date(),
    end: new Date(),
    allDay: false,
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2019, 0, 4, 12, 0, 0, 0),
    end: new Date(2019, 0, 4, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 99,
    title: 'Lunch',
    start: new Date(2019, 0, 4, 0, 0, 0, 0),
    end: new Date(2019, 0, 4, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2019, 0, 5, 19, 0, 0, 0),
    end: new Date(2019, 0, 5, 20, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2019, 0, 12, 21, 0, 0, 0),
    end: new Date(2019, 0, 12, 21, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2019, 0, 12, 20, 0, 0, 0),
    end: new Date(2019, 0, 12, 21, 0, 0, 0),
  },
];

class Calendar extends Component {
  state = {
  };

  handleSelect = ({ start }) => <DialogEvent dDate={start} />

  render() {
    return (
      <div className="toto">
        <Button date={new Date()} />
        <BigCalendar
          views={['month', 'week', 'day']}
          defaultView="month"
          localizer={localizer}
          events={myEventsList}
          selectable
          onSelectEvent={() => console.log('pop-up to modify')}
          onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}

export default Calendar;
