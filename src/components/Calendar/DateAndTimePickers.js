import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { recordDateAndTime } from '../../actions/eventActions';

const styles = () => ({
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
  constructor(props) {
    super(props);
    this.state = {
      begingDate: moment(props.startingDate).toISOString(true).substr(0, 19),
      endingDate: moment(props.startingDate).toISOString(true).substr(0, 19),
    };

    DateAndTimePickers.propTypes = {
      startingDate: PropTypes.object.isRequired,
      classes: PropTypes.object.isRequired,
      recordDateAndTime: PropTypes.func.isRequired,
    };
  }

  componentDidMount() {
    const { begingDate, endingDate } = this.state;
    const { recordDateAndTime } = this.props;
    recordDateAndTime(begingDate, endingDate);
  }

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
    const { classes } = this.props;
    const { begingDate, endingDate } = this.state;

    return (
      <form className={classes.container} noValidate>
        <TextField
          required
          className={classes.beginningDate}
          id="beginningDate"
          label="Date et heure de début"
          type="datetime-local"
          defaultValue={begingDate}
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
          defaultValue={endingDate}
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

const mapStateToProps = state => state;

export default connect(mapStateToProps,
  { recordDateAndTime })(withStyles(styles)(DateAndTimePickers));
