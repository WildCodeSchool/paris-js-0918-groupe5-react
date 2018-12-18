import React from 'react';
import { connect } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { recordSwitchLabels } from '../../actions/eventActions';


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

  onBlur = () => {
    const {
      checkedA,
      checkedB,
      checkedC,
      checkedD,
    } = this.state;
    const { recordSwitchLabels } = this.props;
    recordSwitchLabels(checkedA, checkedB, checkedC, checkedD);
  }

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
              onBlur={this.onBlur}
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
              onBlur={this.onBlur}
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
              onBlur={this.onBlur}
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
              onBlur={this.onBlur}
              value="checkedD"
              color="primary"
            />
          )}
        />
      </FormGroup>
    );
  }
}


SwitchLabels.propTypes = {
  recordSwitchLabels: SwitchLabels.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    recordSwitchLabels,
  },
)(SwitchLabels);
