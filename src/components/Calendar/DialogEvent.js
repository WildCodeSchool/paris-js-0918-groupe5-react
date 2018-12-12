import React, { Component } from 'react';
import axios from 'axios';

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
// import { assertExpressionStatement } from 'babel-types';

class DialogEvent extends Component {
      state = {
        name: '',
        address: '',
        // dateBeginning: '',
        // dateEnd: '',
        // hourBeginning: '',
        // hourEnd: '',
        // category: '',
        // frequency: '',
        // accountable: '',
        // visibility: false,
        // recall: false,
        // immediateRecall: false,
        // mood: '',
        // status: false
      }

      handleClose = () => {
        this.props.onOpen();
      };

      eventInformations = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      recordedEvent = () => {
        axios.post('http://localhost:4243/events', this.state)
          .then(result => alert(`L'évenement "${result.data.name}" a bien été enregistré`));
        this.handleClose();
      }

      // componentDidMount(){
      //   axios.get('http://localhost:4243/events')
      //     .then(result=>console.log(result.data))
      // }

      render() {
        const { openOrNot, dDate } = this.props;
        const { name, address } = this.state;
        return (
          <Dialog
            open={openOrNot}
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
                name="name"
                value={name}
                onChange={this.eventInformations}
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
                name="address"
                value={address}
                onChange={this.eventInformations}
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
              <Button onClick={this.handleClose} color="primary">Annuler</Button>
              <Button onClick={this.recordedEvent} color="primary">Enregistrer</Button>
            </DialogActions>
          </Dialog>
        );
      }
}

export default DialogEvent;
