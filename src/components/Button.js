import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwitchLabel from './SwitchLabels';
import SimpleSelect from './SimpleSelect';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>+</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Nouvel événement</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="titre"
              label="Titre"
              type="text"
              fullWidth
            />
              <TextField
              autoFocus
              margin="dense"
              id="catégorie"
              label="Catégorie"
              type="text"
              fullWidth
            />
              <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Adresse"
              type="text"
              fullWidth
            />
            <SwitchLabel />
              <TextField
              autoFocus
              margin="dense"
              id="date"
              label="Date"
              type="date"
              fullWidth
            />
              <TextField
              autoFocus
              margin="dense"
              id="hour"
              label="Heure"
              type="hour"
              fullWidth
            />
          <SimpleSelect />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
