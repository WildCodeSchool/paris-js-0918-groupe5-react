import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import EventsTable from './EventsTable';
import getServerAuthority from '../../config/getServerAuthority';

class Monitoring extends Component {
  _isMounted = false;// indicates whether the component is mounted in order to prevent
  // setState in async functions to be executed when component is unmounted (may cause memory leak)

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount = () => {
    this.getSortedPastEvent();
    this._isMounted = true;
  };

  componentDidUpdate = (prevProps) => {
    const { selectedReceiver } = this.props;
    if (prevProps.selectedReceiver !== selectedReceiver) {
      this.getSortedPastEvent();
    }
  };

  // returns all events related to Caregiver
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

  // returns only events that have a mood value
  getEventsWithMood = async () => {
    try {
      const events = await this.getEventsData();
      const result = events.filter(e => e.mood !== null);
      // console.log('getEventsWithMood', result);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  };

  // returns events with dates in ISO format
  formatDatesToISO = async () => {
    try {
      const events = await this.getEventsWithMood();
      const result = events.map((e) => {
        e.startingDate = new Date(e.startingDate).toISOString();
        return e;
      });
      // console.log('formatDatesToISO', result);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  };

  // returns only past events
  getPastEvents = async () => {
    try {
      const events = await this.formatDatesToISO();
      const result = events.filter(e => new Date(e.startingDate) < new Date());
      // console.log('getPastEvents', result);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  };

  // returns past events sorted in reversed chronological order
  getSortedPastEvent = async () => {
    try {
      const events = await this.getPastEvents();
      const result = events
        .sort((a, b) => new Date(a.startingDate) - new Date(b.startingDate))
        .reverse();
      // console.log('getSortedPastEvent', result);
      if (this._isMounted) this.setState({ events: result });
    } catch (err) {
      console.error(err);
    }
  };

  componentWillUnmount = () => { this._isMounted = false; };

  render() {
    const { events } = this.state;
    return (
      <div style={{ paddingTop: 40 }}>
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

const mapStateToProps = state => ({
  selectedReceiver: state.info.selectedReceiver,
});
export default connect(mapStateToProps, null)(Monitoring);
