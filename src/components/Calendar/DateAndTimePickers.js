import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    width: 260,
  },
  beginningDate: {
    marginRight: '1.9vw',
    width: 260,
  },
});

function DateAndTimePickers(props) {
  const { classes } = props;
{console.log('dDate', props.dDate)}


  return (
    <form className={classes.container} noValidate>
      <TextField
        required
        className={classes.beginningDate}
        id="beginningDate"
        label="Date et heure de début"
        type="datetime-local"
        // defaultValue={props.dDate}
        defaultValue="2018-01-01T10:00"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        required
        id="endingDate"
        label="Date et heure de fin"
        type="datetime-local"
        // defaultValue={props.dDate}
        defaultValue="2018-01-01T11:00"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateAndTimePickers);
