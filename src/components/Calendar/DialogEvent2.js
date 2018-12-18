import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { recordTitre, recordAddress } from '../../actions/eventActions';

import SwitchLabel from './SwitchLabels';
import SimpleSelect from './SimpleSelect';
import SimpleSelectAddress from './SimpleSelectAddress';
import DateAndTimePickers from './DateAndTimePickers';


const handleClose = (props) => {
  props.onOpen();
};

// eventInformations = (e) => {
//   this.setState({
//     [e.target.name]: e.target.value,
//   });
// };

// onSubmit = () => {
//   const { titreStateValue, adressStateValue } = this.state;
//   const { recordTitre, recordAddress } = this.props;
//   recordTitre(titreStateValue);
//   recordAddress(adressStateValue);
// }

const DialogEvent2 = ({
  dispatchAnAction,
  dispatchAnotherAction,
  openOrNot,
  dDate,
  titreValue,
  adressValue,
  props,
}) => {
  console.log('props', props);
  console.log('titreValue', titreValue);
  return (
    <Dialog
      open={openOrNot}
      onClose={handleClose}
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
          value={titreValue}
          onChange={recordTitre}
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
          value={adressValue}
          onChange={recordAddress}
        />
        <SimpleSelectAddress />
        <div>
          <br />
        </div>
        <DateAndTimePickers dDate={dDate} />
        <SimpleSelect />
        <SwitchLabel />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Annuler</Button>
        <Button onClick={handleClose} color="primary">Enregistrer</Button>
      </DialogActions>
    </Dialog>);
};

const mapStateToProps = state => ({
  titreValue: state.event.name,
  adressValue: state.event.adress,
});

const mapDispatchToProps = dispatch => ({
  recordTitre: () => dispatch(recordTitre),
  recordAddress: () => dispatch(recordAddress),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogEvent2);
