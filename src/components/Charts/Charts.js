import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { connect } from 'react-redux';
import VisitsChart from './components/VisitsChart';
import MoodChart from './components/MoodChart';
import getServerAuthority from '../../config/getServerAuthority';


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNamesArray: [],
      moodArray: [],
      nonFollowedVisitsArray: [],
      visitsArray: [],
      absencesArray: [],
    };
  }

  componentDidMount = () => this.init();

  componentDidUpdate = (prevProps) => {
    const { selectedReceiver } = this.props;
      this.init();
    }


  // the five arrays that need to be passed to the charts are created and set as states
  init = () => {
    this.createDayNamesArray();
    this.createMoodArray();
    this.createVisitsAndAbsencesArrays();
    this.createNonFollowedVisitsArray();
  };

  // returns an array containing the seven last days (date format ex: "Thu Jan 03 2019")
  getLast7Days = () => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      let d = new Date();
      d.setDate(d.getDate() - i - 1);
      d = d.toString().slice(0, 15);
      result.unshift(d);
    }
    // console.log('getLast7Days', result);
    return result;
  };

  // formats sqlite dates from DB so they can be compared with getLast7Days() dates
  // ex: "2019-01-03T13:41:54.111Z" => "Thu Jan 03 2019"
  formatDateData = events => events.map((e) => {
    e.startingDate = String(moment(e.startingDate)).slice(0, 15);
    return e;
  });

  // optional : for greater clarity in the console, keeps only relevant information from events
  simplifyEvents = events => events.map(e => (
    {
      id: e.id, startingDate: e.startingDate, mood: e.mood, followedVisit: e.followedVisit,
    }));

  // returns an array containing all the scheduled events from DB
  getEventsData = () => {
    const token = localStorage.getItem('token');
    return axios({
      method: 'GET',
      url: `${getServerAuthority()}/events`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data)
      .then(res => this.formatDateData(res))
      .then(res => this.simplifyEvents(res));// optional
  }

  // filters all scheduled events from DB to keep only scheduled events of the previous week
  getLastWeekEvents = async () => {
    try {
      const [eventsData, lastWeek] = await Promise.all([this.getEventsData(), this.getLast7Days()]);
      const result = eventsData.filter(e => lastWeek.includes(e.startingDate));
      // console.log('getLastWeekEvents', result);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  };

  // filters scheduled events of the previous week to keep only those that are tracked
  getFollowedEvents = async () => {
    try {
      const events = await this.getLastWeekEvents();
      const result = events.filter(e => e.followedVisit);
      // console.log('getFollowedEvents', result);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  };

  // turns our previous week dates into simpler french day names
  // ex: "Thu Jan 03 2019" => "JEU 03"
  createDayNamesArray = async () => {
    try {
      const arr = await this.getLast7Days();
      const result = arr.map((e) => {
        const day = e.slice(8, 10);
        switch (e.slice(0, 3)) {
          case 'Mon': return `LUN ${day}`;
          case 'Tue': return `MAR ${day}`;
          case 'Wed': return `MER ${day}`;
          case 'Thu': return `JEU ${day}`;
          case 'Fri': return `VEN ${day}`;
          case 'Sat': return `SAM ${day}`;
          case 'Sun': return `DIM ${day}`;
          default: return '...';
        }
      });
      this.setState({ dayNamesArray: result });
      // console.log('createDayNamesArray', this.state.dayNamesArray);
    } catch (err) {
      console.error(err);
    }
  };

  // returns an array containing the seven moods (or average moods) of the previous week
  // allowed values in DB :
  //   null -> no mood recorded
  //   0 -> bad mood
  //   5 -> medium mood
  //   10 -> good mood
  createMoodArray = async () => {
    try {
      const [week, events] = await Promise.all([this.getLast7Days(), this.getFollowedEvents()]);
      const result = [];
      week.forEach((day) => {
        const dailyMoods = [];
        let currentMood = null;
        events.forEach((e) => {
          if (e.startingDate === day && e.mood !== null) {
            dailyMoods.push(e.mood);
          }
        });
        if (dailyMoods.length !== 0) {
          currentMood = dailyMoods.reduce((total, value) => total + value) / dailyMoods.length;
        }
        result.push(currentMood);
      });
      this.setState({ moodArray: result });
      // console.log('createMoodArray', result);
    } catch (err) {
      console.error(err);
    }
  };

  // returns an array containing the number of non tracked visits for each day of the previous week
  createNonFollowedVisitsArray = async () => {
    try {
      const [week, events] = await Promise.all([this.getLast7Days(), this.getLastWeekEvents()]);
      const nonFollowedVisitsArray = [];
      week.forEach((day) => {
        let dailyNonFollowedVisits = 0;
        events.forEach((e) => {
          if (e.startingDate === day && e.followedVisit === false) {
            dailyNonFollowedVisits++;
          }
        });
        nonFollowedVisitsArray.push(dailyNonFollowedVisits);
      });
      this.setState({ nonFollowedVisitsArray });
      // console.log('this.state.nonFollowedVisitsArray', this.state.nonFollowedVisitsArray);
    } catch (err) {
      console.error(err);
    }
  };

  // returns 2 arrays:
  // - visitsArray contains the number of tracked visits for each day of the previous week
  // - absencesArray contains the number of absences of a tracked event (event is scheduled and
  // tracked but no mood recorded) for each day of the previous week
  createVisitsAndAbsencesArrays = async () => {
    try {
      const [week, events] = await Promise.all([this.getLast7Days(), this.getFollowedEvents()]);
      const visitsArray = [];
      const absencesArray = [];
      week.forEach((day) => {
        let dailyVisits = 0;
        let dailyAbsences = 0;
        events.forEach((e) => {
          if (e.startingDate === day) {
            if (e.mood !== null) {
              dailyVisits++;
            } else {
              dailyAbsences++;
            }
          }
        });
        visitsArray.push(dailyVisits);
        absencesArray.push(dailyAbsences);
      });
      this.setState({ visitsArray });
      this.setState({ absencesArray });
      // console.log('this.state.absencesArray', this.state.absencesArray)
      // console.log('this.state.visitsArray', this.state.visitsArray)
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      nonFollowedVisitsArray,
      absencesArray,
      visitsArray,
      moodArray,
      dayNamesArray,
    } = this.state;
    return (
      <div>
        <Grid container justify="center" spacing={32}>
          <Grid item lg={6} md={8} sm={11} xs={12}>
            <VisitsChart nonFollowedVisitsArray={nonFollowedVisitsArray} absencesArray={absencesArray} visitsArray={visitsArray} dayNamesArray={dayNamesArray} />
          </Grid>
          <Grid item lg={6} md={8} sm={11} xs={12}>
            <MoodChart moodArray={moodArray} dayNamesArray={dayNamesArray} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedReceiver: state.info.selectedReceiver,
});
export default connect(mapStateToProps, null)(Charts);
