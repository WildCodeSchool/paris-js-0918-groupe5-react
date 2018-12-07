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
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtons extends React.Component {
  state = {
    value: 'SMS',
  };

  handleChange = (e) => {
    const { handleCommunicationPreference } = this.props;
    handleCommunicationPreference(e);
    console.log(e.target.value);
  };

  render() {
    const { classes, communicationPreference } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" required>Préférence de communication</FormLabel>
          <RadioGroup
            aria-label="communicationPreference"
            name="communicationPreference"
            className={classes.group}
            value={communicationPreference}
            onChange={this.handleChange}
          >
            <FormControlLabel value="SMS" control={<Radio />} label="SMS" />
            <FormControlLabel value="Téléphone" control={<Radio />} label="Téléphone" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCommunicationPreference: PropTypes.func.isRequired,
  communicationPreference: PropTypes.string.isRequired,
};

export default withStyles(styles)(RadioButtons);
