import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#FC8F72',
    color: 'white',
  },
};

const NavBarTop = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
     {/*  */}
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
        <Grid container spacing={0}>
        <Grid item xs={3}>
          <Typography variant="h6" color="inherit">
            Tableau de bord
          </Typography>
          </Grid>
          <Grid item xs={3}>
          <Typography variant="h6" color="inherit">
            Contacts
          </Typography>
          </Grid>
          <Grid item xs={3}>
          <Typography variant="h6" color="inherit">
            Calendrier
          </Typography>
          </Grid>
          <Grid item xs={3}>
          <Typography variant="h6" color="inherit">
            Suivi
          </Typography>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/*  */}
    </div>
  );
}

NavBarTop.propTypes = {
  classes: PropTypes.object.isRequired,
};


 
export default withStyles(styles)(NavBarTop);
