import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import EventsTable from './EventsTable';
import getServerAuthority from '../../config/getServerAuthority';

class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount = () => {
    this.getSortedPastEvent();
  };

  // returns all events from DB
  getEventsData = () => {
    const token = localStorage.getItem('token');
    return axios({
      method: 'GET',
      url: `${getServerAuthority()}/events`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data);
  };

  // returns only tracked events
  getFollowedEvents = async () => {
    try {
      const events = await this.getEventsData();
      const result = events.filter(e => e.followedVisit);
      console.log('getFollowedEvents', result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // returns events with dates with ISO format
  formatDatesToISO = async () => {
    try {
      const events = await this.getFollowedEvents();
      const result = events.map((e) => {
        e.startingDate = new Date(e.startingDate).toISOString();
        return e;
      });
      console.log('formatDatesToISO', result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // returns only past events
  getPastEvents = async () => {
    const events = await this.formatDatesToISO();
    const result = events.filter(e => new Date(e.startingDate) < new Date());
    console.log('getPastEvents', result);
    return result;
  };

  // returns past events sorted in reversed chronological order
  getSortedPastEvent = async () => {
    try {
      const events = await this.getPastEvents();
      const result = events.sort((a, b) => new Date(a.startingDate) - new Date(b.startingDate)).reverse();
      console.log('getSortedPastEvent', result);
      this.setState({ events: result });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { events } = this.state;
    return (
      <div style={{ padding: 30 }}>
        <h2>Suivi</h2>
        <Grid container justify="center">
          <Grid
            item
            xs={9}
            style={{
              padding: 30,
            }}
          >
            <EventsTable events={events} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Monitoring;
