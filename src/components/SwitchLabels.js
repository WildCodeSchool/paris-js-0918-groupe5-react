import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends React.Component {
  state = {
    checkedA: false,
    checkedB: false,
    checkedC: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Evénement visible par tous ?"
        />
        <FormControlLabel
          label="Rappel au responsable avant l'évenement ?"
          control={
            <Switch
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
        />
        <FormControlLabel
          label="Notification immédiate au responsable ?"
          control={
            <Switch
              checked={this.state.checkedC}
              onChange={this.handleChange('checkedC')}
              value="checkedB"
              color="primary"
            />
          }
        />
      </FormGroup>
    );
  }
}

export default SwitchLabels;
