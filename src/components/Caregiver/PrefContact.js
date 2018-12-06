import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class PrefContact extends React.Component {
  state = {
    checkedA: false,
    checkedB: true,
    
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {


    return (
      <FormGroup row>
      
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="SMS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Mail"
        />
        
      </FormGroup>
    );
  }
}

PrefContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrefContact);
