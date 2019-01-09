import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectResponsible = () => (
  <Select
    value="{responsible}"
    // onChange={this.handleChange}
    name="responsible"
    // inputProps={{
    //   id: 'responsible-required',
    // }}
    // className={classes.selectEmpty}
  >
    <MenuItem value="grey">Dr Grey</MenuItem>
    <MenuItem value="jackson">Michael Jackson</MenuItem>
    <MenuItem value="jolivet">Karine Jolivet</MenuItem>
  </Select>
);

export default SelectResponsible;
