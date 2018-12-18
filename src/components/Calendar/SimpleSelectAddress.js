import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends React.Component {
  state = {
    checkedE: false,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { checkedE } = this.state;
    return (
      <FormGroup row>
        <FormControlLabel
          control={(
            <Switch
              checked={checkedE}
              onChange={this.handleChange('checkedE')}
              value="checkedE"
            />)}
          label="Utiliser l'adresse du domicile de Maurice"
        />
      </FormGroup>
    );
  }
}

export default SwitchLabels;
