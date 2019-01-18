import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { recordSwitchLabels } from '../../actions/eventActions';


class SwitchLabels extends React.Component {
  state = {
    visibleEvent: false,
    followedVisit: false,
    reminder: false,
    immediateNotif: false,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  onBlur = () => {
    const {
      visibleEvent,
      followedVisit,
      reminder,
      immediateNotif,
    } = this.state;
    const { recordSwitchLabels } = this.props;
    recordSwitchLabels(visibleEvent, followedVisit, reminder, immediateNotif);
  }

  render() {
    const {
      visibleEvent,
      followedVisit,
      reminder,
      immediateNotif,
    } = this.state;
    return (
      <FormGroup row>
        <FormControlLabel
          control={(
            <Switch
              checked={visibleEvent}
              onChange={this.handleChange('visibleEvent')}
              onBlur={this.onBlur}
              value="visibleEvent"
            />)}
          label="Evénement visible par tous ?"
        />
        <div>
          <br />
        </div>
        <FormControlLabel
          control={(
            <Switch
              checked={followedVisit}
              onChange={this.handleChange('followedVisit')}
              onBlur={this.onBlur}
              value="followedVisit"
            />)}
          label="Autoriser le suivi de la visite ?"
        />
        <FormControlLabel
          label="Rappel au responsable 24h avant l'événement ?"
          control={(
            <Switch
              checked={reminder}
              onChange={this.handleChange('reminder')}
              onBlur={this.onBlur}
              value="reminder"
              color="primary"
            />)}
        />
        <FormControlLabel
          label="Notification immédiate au responsable ?"
          control={(
            <Switch
              checked={immediateNotif}
              onChange={this.handleChange('immediateNotif')}
              onBlur={this.onBlur}
              value="immediateNotif"
              color="primary"
            />
          )}
        />
      </FormGroup>
    );
  }
}

SwitchLabels.propTypes = {
  recordSwitchLabels: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    recordSwitchLabels,
  },
)(SwitchLabels);
