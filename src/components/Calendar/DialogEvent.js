import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SwitchLabel from './SwitchLabels';
import SimpleSelect from './SimpleSelect';
import SimpleSelectAddress from './SimpleSelectAddress';
import DateAndTimePickers from './DateAndTimePickers';

class DialogEvent extends Component {
      state = {
        titleFieldValue : '',
        addressFieldValue: ''
      }

      handleClose = () => {
        this.props.onOpen();
      };

      inputTitle = (e) => {
        this.setState({
          titleFieldValue: e.target.value
      });
      }

      inputAddress = (e) => {
        this.setState({
          addressFieldValue: e.target.value
      });
      }

      render() {
        // console.log('dialogevent', this.props.dDate)
        // console.log(this.state.titleFieldValue)
        // console.log(this.state.addressFieldValue)
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
                onChange={this.inputTitle}
              />
              {/* {console.log(TextField.getValue())} */}
              <TextField
                required
                autoFocus
                margin="dense"
                id="address"
                label="Adresse"
                type="text"
                fullWidth
                onChange={this.inputAddress}
              />
              <SimpleSelectAddress />
              <div> <br/> </div>
              <DateAndTimePickers dDate={this.props.dDate}/>
              <SimpleSelect />
              <SwitchLabel />

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
