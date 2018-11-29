import React from 'react';
import  {NavLink} from 'react-router-dom';

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

const NavBarReceiver = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
     {/*  */}
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
        <Grid container spacing={0}>
        <Grid item xs={3}>
        <NavLink exact to='/'>
          <Typography variant="h6" color="inherit">
            Tableau de bord
          </Typography>
          </NavLink>
          </Grid>
          <Grid item xs={3}>
          <NavLink to='/contacts'>
          <Typography variant="h6" color="inherit">
            Contacts
          </Typography>
          </NavLink>
          </Grid>
          <Grid item xs={3}>
          <NavLink to='/calendrier'>
          <Typography variant="h6" color="inherit">
            Calendrier
          </Typography>
          </NavLink>
          </Grid>
          <Grid item xs={3}>
          <NavLink to='/suivi'>
          <Typography variant="h6" color="inherit">
            Suivi
          </Typography>
          </NavLink>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/*  */}
    </div>
  );
}

NavBarReceiver.propTypes = {
  classes: PropTypes.object.isRequired,
};


 
export default withStyles(styles)(NavBarReceiver);
