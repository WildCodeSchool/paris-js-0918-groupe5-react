import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import NavBarReceiver from './NavBarReceiver';
import NavBarCareGiver1 from './NavBarCareGiver1';

const RemainingComponent = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <NavBarCareGiver1 />
        </Grid>

        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <NavBarReceiver />
        </Grid>
      </Grid>
    </div>
  );
};

export default RemainingComponent;
