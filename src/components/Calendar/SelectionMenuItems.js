import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class SelectionMenuItems extends Component {
  handleChange = ({ target: { value } }) => {
    const { record } = this.props;
    record(value);
  }

  render() {
    const { type, listeOfChoices, fieldValue } = this.props;
    return (
      <Select
        value={fieldValue}
        onChange={this.handleChange}
        name={type}
      >
        {listeOfChoices.map(item => (
          <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>))}
      </Select>
    );
  }
}

SelectionMenuItems.propTypes = {
  record: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  listeOfChoices: PropTypes.array.isRequired,
  fieldValue: PropTypes.string.isRequired,
};

export default SelectionMenuItems;
