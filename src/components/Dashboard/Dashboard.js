import React from 'react';
import Grid from '@material-ui/core/Grid';
import Charts from '../Charts/Charts';

const Dashboard = () => (
  <div className="Dashboard">
    <Grid container spacing={0}>
      <Grid item xs={10}>
        <Charts />
      </Grid>
    </Grid>
  </div>
);

export default Dashboard;
