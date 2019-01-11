import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    marginTop: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtons extends React.Component {

  handleChange = (e) => {
    const { handlePreferenceOfContact } = this.props;
    handlePreferenceOfContact(e);
  };

  render() {
    const { classes, preferenceOfContact } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" required>Préférence de communication</FormLabel>
          <RadioGroup
            aria-label="preferenceOfContact"
            name="preferenceOfContact"
            className={classes.group}
            value={preferenceOfContact}
            onChange={this.handleChange}
          >
            <FormControlLabel value="SMS" control={<Radio />} label="SMS" />
            <FormControlLabel value="Email" control={<Radio />} label="Email" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  handlePreferenceOfContact: PropTypes.func.isRequired,
  preferenceOfContact: PropTypes.string.isRequired,
};

export default withStyles(styles)(RadioButtons);
