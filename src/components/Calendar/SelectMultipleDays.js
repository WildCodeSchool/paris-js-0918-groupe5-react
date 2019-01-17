import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { recordMultipleDays } from '../../actions/eventActions';

const listInString = values => Object.keys(values).filter(day => values[day]).join();

class SelectMultipleDays extends Component {
  constructor() {
    super();
    this.state = {
      everyMonday: false,
      eveyTuesday: false,
      everyWednesday: false,
      everyThursday: false,
      everyFriday: false,
      everySaturday: false,
      everySunday: false,
    };
  }

  handleChange = (name) => {
    const { record } = this.props;
    this.setState(prevState => ({ [name]: !prevState[name] }),
      () => record(this.state));
  };

  render() {
    return (
      Object.entries(this.state).map(([day, checkedStatut]) => (
        <FormControlLabel
          key={day}
          control={(
            <Checkbox
              checked={checkedStatut}
              name={day}
              onChange={() => this.handleChange(day)}
            />)}
          label={day}
        />
      ))
    );
  }
}

SelectMultipleDays.propTypes = {
  record: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: days => dispatch(recordMultipleDays(listInString(days))),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectMultipleDays);