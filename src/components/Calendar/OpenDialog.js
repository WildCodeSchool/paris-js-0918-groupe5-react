import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { recordAllInfo, openEventDialog } from '../../actions/eventActions';

import DialogContener from './DialogContener';

const DialogToCreateEvent = ({
  isOpen,
  allInfo,
  OpenOrCloseDialog,
  recordAllInfo,
}) => (
  <Dialog open={isOpen} onClose={() => OpenOrCloseDialog()} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Nouvel événement</DialogTitle>
    <DialogContener />
    <DialogActions>
      <Button onClick={() => OpenOrCloseDialog()} color="primary">Annuler</Button>
      <Button onClick={() => recordAllInfo(allInfo)} color="primary">Enregistrer</Button>
    </DialogActions>
  </Dialog>
);

DialogToCreateEvent.propTypes = {
  allInfo: PropTypes.object.isRequired,
  recordAllInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  allInfo: state.event,
  isOpen: state.event.isOpen,
});

const mapDispatchToProps = dispatch => ({
  recordAllInfo: allInfo => dispatch(recordAllInfo(allInfo)),
  OpenOrCloseDialog: bool => dispatch(openEventDialog(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogToCreateEvent);
