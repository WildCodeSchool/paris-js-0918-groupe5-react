import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { recordEventInfo } from '../../actions/eventActions';

import SimpleSelect from './SimpleSelect';
import SimpleSelectAddress from './SimpleSelectAddress';
import DateAndTimePickers from './DateAndTimePickers';
// import { prototype } from 'react-transition-group/CSSTransition';
// import { assertExpressionStatement } from 'babel-types';

class DialogEvent extends Component {
  constructor() {
    super();
    this.state = {
      titreStateValue: '',
      adressStateValue: '',
    };
    DialogEvent.propTypes = {
      openOrNot: PropTypes.bool.isRequired,
      onOpen: PropTypes.func.isRequired,
    };
  }

  handleClose = () => {
    const { onOpen } = this.props;
    onOpen();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onBlur = () => {
    const { titreStateValue, adressStateValue } = this.state;
    const { recordEventInfo } = this.props;
    recordEventInfo(titreStateValue, adressStateValue);
  }

  render() {
    const { openOrNot, dDate } = this.props;
    const { titreStateValue, adressStateValue } = this.state;
    return (
      <Dialog
        open={openOrNot}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nouvel événement</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="titreStateValue"
            label="Titre"
            type="text"
            fullWidth
            name="titreStateValue"
            value={titreStateValue}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="adressStateValue"
            label="Adresse"
            type="text"
            fullWidth
            name="adressStateValue"
            value={adressStateValue}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <SimpleSelectAddress />
          <div>
            <br />
          </div>
          <DateAndTimePickers dDate={dDate} />
          <SimpleSelect />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">Annuler</Button>
          <Button onClick={() => console.log('submitting')} color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  titreValue: state.event.name,
});

export default connect(
  mapStateToProps,
  {
    recordEventInfo,
  },
)(DialogEvent);
