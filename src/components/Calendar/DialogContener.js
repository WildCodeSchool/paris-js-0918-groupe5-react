import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { recordSimpleSelect } from '../../actions/eventActions';

import SelectTitle from './SelectTitle';
import SelectDate from './SelectDate';
import SelectReceiverAddress from './SelectReceiverAddress';
// import SelectOtherAdress from './SelectOtherAdress';
import SelectFrequency from './SelectFrequency';
import SelectResponsible from './SelectResponsible';
import SelectOtherInfo from './SelectOtherInfo';
import SelectCategory from './SelectCategory';

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

class DialogContener extends React.Component {
  state = {
    frequency: '',
    responsible: '',
    category: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onBlur = () => {
    const { frequency, responsible, category } = this.state;
    const { recordSimpleSelect } = this.props;
    recordSimpleSelect(frequency, responsible, category);
  }

  render() {
    const { classes, startingDate } = this.props;
    const { handleChange } = this.state;
    return (
      <DialogContent>
        <SelectTitle handleChange={handleChange} />
        <SelectReceiverAddress />
        {/* <SelectOtherAdress /> */}
        <SelectDate startingDate={startingDate} />
        <form
          className={classes.root}
          autoComplete="off"
          onBlur={() => this.onBlur()}
        >


          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="responsible-required">Responsable</InputLabel>
            <SelectResponsible />
            {/* <FormHelperText>
              Assigner un responsable à cet événement
            </FormHelperText> */}
          </FormControl>

          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="frequency-required">Fréquence</InputLabel>
            <SelectFrequency />
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
}

DialogContener.propTypes = {
  classes: PropTypes.object.isRequired,
  recordSimpleSelect: PropTypes.func.isRequired,
  startingDate: PropTypes.object.isRequired,
};


const mapStateToProps = state => state;

export default connect(mapStateToProps,
  { recordSimpleSelect })(withStyles(styles)(DialogContener));
