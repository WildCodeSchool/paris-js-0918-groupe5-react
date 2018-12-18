import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SimpleSelectValues from './SimpleSelectValues';

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
    frequency: '',
    responsible: '',
    category: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { frequency, responsible, category } = this.state;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="frequency-required">Fréquence</InputLabel>
          <Select
            value={frequency}
            onChange={this.handleChange}
            name="frequency"
            inputProps={{
              id: 'frequency-required',
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="once">Une seule fois</MenuItem>
            <MenuItem value="everyday">Tous les jours</MenuItem>
            <MenuItem value="everydayWeek">
              Tous les jours de la semaine (du lundi au vendredi)
            </MenuItem>
            <MenuItem value="everyMonday">Tous les lundis</MenuItem>
            <MenuItem value="eveyTuesday">Tous les mardis</MenuItem>
            <MenuItem value="everyWednesday">Tous les mercredis</MenuItem>
            <MenuItem value="everyThursday">Tous les jeudis</MenuItem>
            <MenuItem value="everyFriday">Tous les vendredis</MenuItem>
            <MenuItem value="everySaturday">Tous les samedis</MenuItem>
          </Select>
          <FormHelperText>
            Indiquer ici la récurrence de l'événement
          </FormHelperText>
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="responsible-required">Responsable</InputLabel>
          <Select
            value={responsible}
            onChange={this.handleChange}
            name="responsible"
            inputProps={{
              id: 'responsible-required',
            }}
            className={classes.selectEmpty}
          >
            <MenuItem value="grey">Dr Grey</MenuItem>
            <MenuItem value="jackson">Michael Jackson</MenuItem>
            <MenuItem value="jolivet">Karine Jolivet</MenuItem>
          </Select>
          <FormHelperText>
            Assigner un responsable à cet événement
          </FormHelperText>
        </FormControl>

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
            <MenuItem value="medical">Consultation médicale</MenuItem>
            <MenuItem value="nurse">Soins infirmiers</MenuItem>
            <MenuItem value="family">Visite d'un proche</MenuItem>
          </Select>
          {/* <FormHelperText>
            Assigner un responsable à cet événement
          </FormHelperText> */}
        </FormControl>
        <SimpleSelectValues {...this.state} />
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
