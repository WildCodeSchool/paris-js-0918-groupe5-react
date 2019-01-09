import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectCategory = () => (
  <Select
  // value={category}
  value="{category}"
  // onChange={this.handleChange}
    name="category"
    // inputProps={{
    //   id: 'category-required',
    // }}
    // className={classes.selectEmpty}
  >
    <MenuItem value="medical">Consultation médicale</MenuItem>
    <MenuItem value="nurse">Soins infirmiers</MenuItem>
    <MenuItem value="family">{'Visite d\'un proche'}</MenuItem>
  </Select>
);

export default SelectCategory;
