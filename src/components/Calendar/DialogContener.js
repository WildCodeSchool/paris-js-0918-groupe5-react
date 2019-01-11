import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

import SelectTitle from './SelectTitle';
import SelectDate from './SelectDate';
import SelectReceiverAddress from './SelectReceiverAddress';
import SelectFrequency from './SelectFrequency';
import SelectResponsible from './SelectResponsible';
import SelectOtherInfo from './SelectOtherInfo';
import SelectCategory from './SelectCategory';
import SelectMultipleDays from './SelectMultipleDays';


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

const DialogContener = ({ classes, startingDate, frequency }) => {
  // console.log(frequency);
  if (frequency !== 'specificdays') {
    return (
      <DialogContent>
        <SelectTitle />
        <SelectReceiverAddress />
        <SelectDate startingDate={startingDate} />
        <form className={classes.root} autoComplete="off">
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="responsible-required">Responsable</InputLabel>
            <SelectResponsible />
            <FormHelperText>
              Assigner un responsable à cet événement
            </FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="frequency-required">Fréquence</InputLabel>
            <SelectFrequency />
            <FormHelperText>
            Séléctionner la récurence d un événement
            </FormHelperText>
          </FormControl>

          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="category-required">Catégorie</InputLabel>
            <SelectCategory />
          </FormControl>
        </form>
        <SelectOtherInfo />
      </DialogContent>
    );
  }
  return (
    <DialogContent>
      <SelectTitle />
      <SelectReceiverAddress />
      <SelectDate startingDate={startingDate} />
      <form
        className={classes.root}
        autoComplete="off"
      >
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="responsible-required">Responsable</InputLabel>
          <SelectResponsible />
          <FormHelperText>
            Assigner un responsable à cet événement
          </FormHelperText>
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="frequency-required">Fréquence</InputLabel>
          <SelectFrequency />
          <FormHelperText>
            Séléctionner la récurence d un événement
          </FormHelperText>
          <SelectMultipleDays />
        </FormControl>

        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="category-required">Catégorie</InputLabel>
          <SelectCategory />
        </FormControl>
      </form>
      <SelectOtherInfo />
    </DialogContent>
  );
};


DialogContener.propTypes = {
  classes: PropTypes.object.isRequired,
  frequency: PropTypes.string.isRequired,
  startingDate: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  frequency: state.event.frequency,
});

export default connect(mapStateToProps,
  {})(withStyles(styles)(DialogContener));
