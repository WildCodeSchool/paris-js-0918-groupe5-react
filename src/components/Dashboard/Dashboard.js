import React from 'react';
import Grid from '@material-ui/core/Grid';
import CalendarLittle from './CalendarLittle';
import Curves from './Curves';
import './CalendarLittle.css';
import './Curves.css';

const Dashboard = () => (
  <div className="Dashboard">
    <Grid container spacing={0}>
      {/* <Grid item xs={12}> */}

      {/* <Grid item xs={12}>
        <NavBarTop />
      </Grid>

          <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={2}>
        <NavBarLeft />
      </Grid> */}

      <Grid item xs={10}>
        <CalendarLittle />
        <Curves />
      </Grid>
    </Grid>

  </div>
);

export default Dashboard;
