import React from 'react';
import Grid from '@material-ui/core/Grid';
import CarlendarLittle from './CalendarLittle';
import Charts from '../Charts/Charts';
import AppBarGlobal from '../AppBarGlobal';
import './CalendarLittle.css';

const App = () => (
  <div className="App">
    <AppBarGlobal />
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
  +
        <CarlendarLittle />
        <Charts />
      </Grid>
    </Grid>
  </div>
);

export default App;
