import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Grid } from '@material-ui/core';

const styles = {
  ButtonsBar: {
		width: '100%',
    background: '#65CDE2',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonRoot: {
    backgroundColor: 'white',
    color: 'black',
    bottom: '-24px',
    width: '159px',
  }
};

const ButtonsBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.ButtonsBar}>
      <Grid container justify="space-around">
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.buttonRoot}
          >
            Tableau de bord
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.buttonRoot}
          >
            Calendrier
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.buttonRoot}
          >
            Contacts
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.buttonRoot}
          >
            Suivi
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

ButtonsBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonsBar);
