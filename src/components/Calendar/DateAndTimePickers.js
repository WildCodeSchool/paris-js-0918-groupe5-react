import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// import DateTimePicker from 'material-ui-datetimepicker';
// import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
// import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
console.log('ola', new Date())
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
    marginRight: '1.7vw',
    width: 260,
  },
});

function DateAndTimePickers(props) {
  const { classes } = props;
  // {console.log('dDate', new Date().toDateString())}
  // console.log('oli', props.dDate)
  // console.log('month', props.dDate.getMonth()+1)
  let monthClicked = props.dDate.getMonth()+1
  monthClicked = monthClicked < 10 ? `0${monthClicked}` : monthClicked
  const dayClicked = props.dDate.toString().substr(8,2)
  const yearClicked = props.dDate.getFullYear()
  // console.log('day', dayClicked)
  // console.log('year', yearClicked)
  // console.log('coucou', new Date().getMonth()+1)
  // const date = new Date().toDateString()
  const defaultDate = `${yearClicked}-${monthClicked}-${dayClicked}T00:00`
  // console.log('defaut', defaultDate)

  return (
    <form className={classes.container} noValidate>
      <TextField
        required
        className={classes.beginningDate}
        id="beginningDate"
        label="Date et heure de début"
        type="datetime-local"
        // defaultValue={props.dDate}
        defaultValue={defaultDate}
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* <DateTimePicker
      value={new Date()}/> */}
      <TextField
        required
        id="endingDate"
        label="Date et heure de fin"
        type="datetime-local"
        // defaultValue={props.dDate}
        defaultValue={defaultDate}
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
