import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends React.Component {
  state = {
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {
      checkedA,
      checkedB,
      checkedC,
      checkedD,
    } = this.state;
    return (
      <FormGroup row>
        <FormControlLabel
          control={(
            <Switch
              checked={checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />)}
          label="Evénement visible par tous ?"
        />
        <div>
          <br />
        </div>
        <FormControlLabel
          control={(
            <Switch
              checked={checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
            />)}
          label="Autoriser le suivi de la visite ?"
        />
        <FormControlLabel
          label="Rappel au responsable 24h avant l'événement ?"
          control={(
            <Switch
              checked={checkedC}
              onChange={this.handleChange('checkedC')}
              value="checkedC"
              color="primary"
            />)}
        />
        <FormControlLabel
          label="Notification immédiate au responsable ?"
          control={(
            <Switch
              checked={checkedD}
              onChange={this.handleChange('checkedD')}
              value="checkedD"
              color="primary"
            />
          )}
        />
      </FormGroup>
    );
  }
}

export default SwitchLabels;
