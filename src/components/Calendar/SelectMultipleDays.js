import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { checkSelectedDays } from '../../actions/eventActions';

// const listInString = values => Object.keys(values).filter(day => values[day]).join();

const SelectMultipleDays = ({ listOfDays, SelectedDays }) => (
  listOfDays.map(item => (
    <FormControlLabel
      key={item.idDay}
      control={(
        <Checkbox
          checked={item.checked}
          name={item.value}
          onChange={() => SelectedDays(item.idDay, item.checked)}
        />)}
      label={item.label}
    />))
);

SelectMultipleDays.propTypes = {
  listOfDays: PropTypes.array.isRequired,
};


const mapStateToProps = state => ({
  listOfDays: state.event.listOfDays,
});

const mapDispatchToProps = dispatch => ({
  SelectedDays: (id, checkedDay) => dispatch(checkSelectedDays(id, checkedDay)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectMultipleDays);
