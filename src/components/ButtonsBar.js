import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Grid } from '@material-ui/core';

const styles = {
  ButtonsBar: {
    width: '100%',
    height: 0,
    background: '#65CDE2',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonRoot: {
    backgroundColor: 'white',
    color: 'black',
    top: '-24px',
    width: '159px',
  },
  link: {
    textDecoration: 'none',
  },
};

const ButtonsBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.ButtonsBar}>
      <Grid container justify="space-around">
        <Grid item>
          <Link to="/tableau_de_bord" className={classes.link}>
            <Fab
              variant="extended"
              color="primary"
              aria-label="Tableau de bord"
              className={classes.buttonRoot}
            >
              Tableau de bord
            </Fab>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/calendrier" className={classes.link}>
            <Fab
              variant="extended"
              color="primary"
              aria-label="Calendrier"
              className={classes.buttonRoot}
            >
              Calendrier
            </Fab>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/contacts" className={classes.link}>
            <Fab
              variant="extended"
              color="primary"
              aria-label="Contacts"
              className={classes.buttonRoot}
            >
              Contacts
            </Fab>
          </Link>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Suivi"
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonsBar);
