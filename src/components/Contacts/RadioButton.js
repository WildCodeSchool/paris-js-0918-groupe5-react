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
    value: 'sms',
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" required>Préférence de communication</FormLabel>
          <RadioGroup
            aria-label="communicationPreference"
            name="communicationPreference"
            className={classes.group}
            value={value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="sms" control={<Radio />} label="sms" />
            <FormControlLabel value="phone" control={<Radio />} label="phone" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);