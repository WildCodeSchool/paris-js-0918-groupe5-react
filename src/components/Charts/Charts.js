import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import VisitsChart from './components/VisitsChart';
import MoodChart from './components/MoodChart';


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNamesArray: [],
      moodArray: [],
      visitsArray: [],
      absencesArray: [],
    };
  }

  componentDidMount = () => {
    this.createDayNamesArray();
    this.createMoodArray();
    this.createVisitsAbsencesArrays();
  };

  // returns an array containing the seven last days (date format ex: "2018-12-20")
  getLast7Days = () => {
    const result = [];
    for (let i = 0; i < 7; i += 1) {
      let d = new Date();
      d.setDate(d.getDate() - i - 1);
      d = d.toString().slice(0, 15);
      result.unshift(d);
    }
    console.log('getLast7Days', result);
    return result;
  };

  // formats sqlite dates from DB so they can be compared with getLast7Days() dates
  // ex: "2018-12-20T13:41:54.111Z" => "2018-12-20"
  formatDateData = events => events.map((e) => {
    e.dateBeginning = String(moment(e.dateBeginning)).slice(0, 15);
    return e;
  });

  // optional : for greater clarity in the console, keeps only relevant information from events
  simplifyEvents = events => events.map(e =>
    ({ id: e.id, dateBeginning: e.dateBeginning, mood: e.mood })
  );

  // returns an array containing all the scheduled events from DB
  getEventsData = () => {
    const token = localStorage.getItem('token');
    return axios({
      method: 'GET',
      url: 'http://localhost:4244/events',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.data)
      .then(res => this.formatDateData(res))
      .then(res => this.simplifyEvents(res));// optional
  }

  // filters all scheduled events from DB to keep only scheduled events of the previous week
  filterEvents = async () => {
    try {
      const [eventsData, lastWeek] = await Promise.all([this.getEventsData(), this.getLast7Days()]);
      const result = eventsData.filter(e => lastWeek.includes(e.dateBeginning));
      console.log('filterEvents', result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // turns our previous week dates into simpler french day names
  // ex: "2018-12-20" => "Mercredi 12"
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
      console.log('createDayNamesArray', this.state.dayNamesArray);
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
      const [week, events] = await Promise.all([this.getLast7Days(), this.filterEvents()]);
      const result = [];
      for (const day of week) {
        const dailyMoods = [];
        let currentMood = null;
        for (const e of events) {
          if(e.dateBeginning === day && e.mood !== null) {
            dailyMoods.push(e.mood);
          }
        }
        if(dailyMoods.length !== 0) {
          currentMood = dailyMoods.reduce((total, value) => total + value) / dailyMoods.length;
        }
        result.push(currentMood);
      }
      this.setState({ moodArray: result });
      console.log('createMoodArray', result);
    } catch (err) {
      console.error(err);
    }
  };

  // returns 2 arrays:
  // - visitsArray contains the number of visits for each day of the previous week
  // - absencesArray contains the number of absences (event is scheduled but no mood recorded)
  // for each day of the previous week
  createVisitsAbsencesArrays = async () => {
    try {
      const [week, events] = await Promise.all([this.getLast7Days(), this.filterEvents()]);
      const visitsArray = [];
      const absencesArray = [];
      for (const day of week) {
        let dailyVisits = 0;
        let dailyAbsences = 0;
        for (const e of events) {
          if(e.dateBeginning === day) {
            if(e.mood !== null) {
              dailyVisits ++;
            } else {
              dailyAbsences ++;
            }
          }
        }
        visitsArray.push(dailyVisits);
        absencesArray.push(dailyAbsences);
      }
      this.setState({ visitsArray });
      this.setState({ absencesArray });
      console.log('this.state.absencesArray', this.state.absencesArray)
      console.log('this.state.visitsArray', this.state.visitsArray)
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      absencesArray,
      visitsArray,
      moodArray,
      dayNamesArray,
    } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item md={6}>
            <VisitsChart absencesArray={absencesArray} visitsArray={visitsArray} dayNamesArray={dayNamesArray} />
          </Grid>
          <Grid item md={6}>
            <MoodChart moodArray={moodArray} dayNamesArray={dayNamesArray} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Charts;
