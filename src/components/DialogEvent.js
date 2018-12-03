import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SwitchLabel from '../SwitchLabels';
import SimpleSelect from '../SimpleSelect';
import DateAndTimePickers from './DateAndTimePickers';

class DialogEvent extends Component {
      handleClose = () => {
        this.props.onOpen();
      };

      render() {
        return (
          <Dialog
            open={this.props.openOrNot}
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
                required
                autoFocus
                margin="dense"
                id="titre"
                label="Titre"
                type="text"
                fullWidth
              />
              <TextField
                required
                autoFocus
                margin="dense"
                id="address"
                label="Adresse"
                type="text"
                fullWidth
              />
              <SwitchLabel />
              <DateAndTimePickers dDate={this.props.dDate}/>
              <SimpleSelect />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">Annuler</Button>
              <Button color="primary">Enregistrer</Button>
            </DialogActions>
          </Dialog>
        )
      }
}

export default DialogEvent;
