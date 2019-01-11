import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';

import OpenDialog from './OpenDialog';

import getServerAuthority from '../../config/getServerAuthority';

import { recordDateAndTime, openEventDialog } from '../../actions/eventActions';

import './style/Calendar.css';


const localizer = BigCalendar.momentLocalizer(moment);
const getGoodFormat = date => moment(date).toISOString(true).substr(0, 19);
// const getGoodFormat = date => moment(date).toISOString(true);


const refactoEventFormat = (allEvents) => {
  const eventsList = [];
  allEvents.map(item => eventsList.push({
    title: item.title,
    start: item.begingDate,
    end: item.endingDate,
    allDay: true,
  }));
  return eventsList;
};


class Calendar extends Component {
  state = {
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
  // openDialogToCreateEvent = ({ start } = new Date()) => {
  //   const { openDialog } = this.state;
  //   this.setState({
  //     openDialog: !openDialog,
  //     startingDate: start,
  //   });
  // }

  // openDialogToCreateEvent = ({ start } = new Date()) => {
  openDialogToCreateEvent = ({ start }) => {
    console.log(start);
    console.log(getGoodFormat(start));

    const { recordDateAndTime, OpenOrCloseDialog } = this.props;
    OpenOrCloseDialog();
    // recordDateAndTime(getGoodFormat(start), getGoodFormat(start));
    recordDateAndTime(getGoodFormat(start), getGoodFormat(start));
  }

  render() {
    const { isLoaded, allEvents } = this.state;
    if (!isLoaded) return <p>ça a pas chargé !!!!!!!</p>;
    return (
      <div className="calendar">
        <BigCalendar
          views={['month', 'week', 'day']}
          defaultView="month"
          localizer={localizer}
          events={refactoEventFormat(allEvents)}
          selectable
          onSelectEvent={() => console.log('pop-up to modify')}
          onSelectSlot={this.openDialogToCreateEvent}
        />
        <OpenDialog />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  startingDate: state.event.startingDate,
  endingDate: state.event.endingDate,
});

const mapDispatchToProps = dispatch => ({
  recordDateAndTime: (begin, end) => dispatch(recordDateAndTime(begin, end)),
  OpenOrCloseDialog: () => dispatch(openEventDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
