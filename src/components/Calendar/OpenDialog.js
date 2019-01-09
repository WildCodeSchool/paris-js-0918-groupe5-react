import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { recordAllInfo } from '../../actions/eventActions';

import DialogContener from './DialogContener';

class DialogToCreateEvent extends Component {
  constructor() {
    super();
    this.state = {
    };
    DialogToCreateEvent.propTypes = {
      openOrNot: PropTypes.bool.isRequired,
      startingDate: PropTypes.object.isRequired,
      allInfo: PropTypes.object.isRequired,
      recordAllInfo: PropTypes.func.isRequired,
      onOpen: PropTypes.func.isRequired,
    };
  }

  handleClose = () => {
    const { onOpen } = this.props;
    onOpen();
  };

  onSubmit = () => {
    const { recordAllInfo, allInfo } = this.props;
    recordAllInfo(allInfo);
  }

  render() {
    const { openOrNot, startingDate, allInfo } = this.props;
    // const { title, adress } = this.state;
    return (
      <Dialog
        open={openOrNot}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nouvel événement</DialogTitle>

        <DialogContener startingDate={startingDate} />

        <DialogActions>
          <Button onClick={this.handleClose} color="primary">Annuler</Button>
          <Button onClick={() => this.onSubmit(allInfo)} color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  allInfo: state.event,
});

export default connect(
  mapStateToProps,
  {
    recordAllInfo,
  },
)(DialogToCreateEvent);
