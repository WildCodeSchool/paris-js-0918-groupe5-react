import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleSelect from './SimpleSelect';
import RadioButton from './RadioButton';


class Contacts extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  toggleOpening = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ajouter un contact professionnel</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="FirstName"
              type="text"
              fullWidth
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="LastName"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Titre"
              type="text"
              fullWidth
            />
            <SimpleSelect />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Téléphone"
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Commentaire"
              type="text"
              fullWidth
            />
            <RadioButton />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Contacts;
