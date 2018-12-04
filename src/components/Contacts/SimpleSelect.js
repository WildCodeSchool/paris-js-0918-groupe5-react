import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    category: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { category } = this.state;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="category-required">Catégorie</InputLabel>
          <Select
            value={category}
            onChange={this.handleChange}
            name="category"
            inputProps={{
              id: 'category-required',
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="doctor">Médecin</MenuItem>
            <MenuItem value="nurse">Infirmier</MenuItem>
            <MenuItem value="gardener">Jardinier</MenuItem>
            <MenuItem value="addCategory">Ajouter une catégorie</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
