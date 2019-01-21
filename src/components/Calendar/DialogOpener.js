import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { postAndClearFields, openEventDialog } from '../../actions/eventActions';

import DialogContener from './DialogContener';

const DialogOpener = ({
  isOpen,
  allInfo,
  OpenOrCloseDialog,
  record,
  idContact,
}) => {
  // console.log(allInfo);
  return (
    <Dialog open={isOpen} onClose={() => OpenOrCloseDialog()} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Nouvel événement</DialogTitle>
      <DialogContener />
      <DialogActions>
        <Button onClick={() => OpenOrCloseDialog()} color="primary">Annuler</Button>
        <Button onClick={() => record(allInfo, idContact)} color="primary">Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
};

DialogOpener.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  allInfo: PropTypes.object.isRequired,
  record: PropTypes.func.isRequired,
  OpenOrCloseDialog: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  allInfo: {
    title: state.event.title,
    OtherAddressChecked: state.event.OtherAddressChecked,
    address: state.event.address,
    startingDate: state.event.startingDate,
    endingDate: state.event.endingDate,
    frequency: state.event.frequency,
    daysSelected: state.event.daysSelected,
    contact: state.event.contact,
    category: state.event.category,
    events: state.event.events,
    visibleEvent: state.event.visibleEvent,
    followedVisit: state.event.followedVisit,
    reminder: state.event.reminder,
    immediateNotif: state.event.immediateNotif,
  },
  isOpen: state.event.isOpen,
  // idContact: state.event.idContact,
});

const mapDispatchToProps = dispatch => ({
  record: (allInfo, idContact) => dispatch(postAndClearFields(allInfo, idContact)),
  OpenOrCloseDialog: bool => dispatch(openEventDialog(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogOpener);
