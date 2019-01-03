import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { recordDateAndTime } from '../../actions/eventActions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
  },
  textField: {
    width: 260,
  },
  beginningDate: {
    marginRight: '1.7vw',
    width: 260,
  },
});

class DateAndTimePickers extends Component {
  state = {
    begingDate: '',
    endingDate: '',
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onBlur = () => {
    const { begingDate, endingDate } = this.state;
    const { recordDateAndTime } = this.props;
    recordDateAndTime(begingDate, endingDate);
  }


  render() {
    const { classes, dDate } = this.props;
    const { begingDate, endingDate } = this.state;
    let monthClicked = dDate.getMonth() + 1;
    monthClicked = monthClicked < 10 ? `0${monthClicked}` : monthClicked;
    const dayClicked = dDate.toString().substr(8, 2);
    const yearClicked = dDate.getFullYear();
    const defaultDate = `${yearClicked}-${monthClicked}-${dayClicked}T00:00`;

    return (
      <form className={classes.container} noValidate>
        <TextField
          required
          className={classes.beginningDate}
          id="beginningDate"
          label="Date et heure de début"
          type="datetime-local"
          defaultValue={defaultDate}
          InputLabelProps={{
            shrink: true,
          }}
          name="begingDate"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
        <TextField
          required
          id="endingDate"
          label="Date et heure de fin"
          type="datetime-local"
          defaultValue={defaultDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          name="endingDate"
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
      </form>
    );
  }
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
  dDate: PropTypes.object.isRequired,
  recordDateAndTime: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps,
  { recordDateAndTime })(withStyles(styles)(DateAndTimePickers));
