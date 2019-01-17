import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  withStyles,
  FormHelperText,
} from '@material-ui/core';

const styles = theme => ({
  displayModal: {
    width: 400,
    align: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  cancelDelete: {
    color: 'grey',
  },
});

const ChooseCategory = (props) => {
  const {
    classes,
  } = props;
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={state.age}
          onChange={handleChange}
          displayEmpty
          name="age"
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </div>

  );
};

export default withStyles(styles)(ChooseCategory);
