import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const ChooseCategoryOfContact = (props) => {
  const {
    classes,
    categoryOfContact,
    handleChangeCategoryOfContact,
  } = props;
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          value={categoryOfContact}
          onChange={handleChangeCategoryOfContact}
          displayEmpty
          name="category"
          className={classes.selectEmpty}
        >
          <MenuItem value="Toutes catégories">Toutes catégories</MenuItem>
          <MenuItem value="Médical">Médical</MenuItem>
          <MenuItem value="Paramédical">Paramédical</MenuItem>
          <MenuItem value="Proches">Proches</MenuItem>
          <MenuItem value="Autre">Autre</MenuItem>
        </Select>
        <FormHelperText>Trier les contacts par catégorie</FormHelperText>
      </FormControl>
    </form>
  );
};

ChooseCategoryOfContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChooseCategoryOfContact);
