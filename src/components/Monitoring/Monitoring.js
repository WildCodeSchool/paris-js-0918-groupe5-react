import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import EventsTable from './EventsTable';

class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentWillMount = () => {
    this.getSortedPastEvent();
  };

  getSortedPastEvent = async () => {
    try {
      const events = await this.getPastEvents();
      const result = events.sort((a, b) => new Date(a.dateBeginning) - new Date(b.dateBeginning)).reverse();
      // console.log('getSortedPastEvent', result);
      this.setState({ events: result });
    } catch (err) {
      console.error(err);
    }
  };

  getPastEvents = async () => { // pourquoi, à ce stade, les events sont déjà triés par date ?
    const events = await this.formatDatesToISO();
    const result = events.filter(e => new Date(e.dateBeginning) < new Date());
    // console.log('getPastEvents', result);
    return result;
  };

  formatDatesToISO = async () => {
    try {
      const events = await this.getEventsData();
      const result = events.map((e) => {
        e.dateBeginning = new Date(e.dateBeginning).toISOString();
        return e;
      });
      // console.log('formatDatesToISO', result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  getEventsData = () => {
    const token = localStorage.getItem('token');
    return axios({
      method: 'GET',
      url: 'http://localhost:4244/events',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data);
  };

  render() {
    const { events } = this.state;
    return (
      <div style={{ padding: 30 }}>
        <h2>Suivi</h2>
        <Grid container>
          <Grid
            item
            xs={9}
            style={{
              padding: 30, maxHeight: 450, overflow: 'auto', backgroundColor: '#F9F9F9',
            }}
          >
            <EventsTable events={events} />
          </Grid>
          <Grid item xs={3}>
            <div>
              COMPONENT 2
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Monitoring;
