import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { recordFrequency } from '../../actions/eventActions';

// import SelectMultipleDays from './SelectMultipleDays';

const listOfFrequency = ['once', 'everyday', 'everydayWeek', 'specificdays'];


class SelectFrequency extends Component {
  constructor() {
    super();
    this.state = {
      frequency: '',
    };
    SelectFrequency.propTypes = {
      record: PropTypes.func.isRequired,
    };
  }

  handleChange = (event) => {
    const { record } = this.props;
    this.setState({ frequency: event.target.value });
    record(event.target.value);
  }

  render() {
    const { frequency } = this.state;
    return (
      <Select
        value={frequency}
        onChange={this.handleChange}
        name="frequency"
        // inputProps={{ id: 'frequency-required' }}
        // className={classes.selectEmpty}
      >
        {listOfFrequency.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: frequency => dispatch(recordFrequency(frequency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFrequency);
