import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChampsCaregivers from './ChampsCaregiver';
import Captcha from './Captcha';
import axios from 'axios';

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

  handleValidation = () => {
    axios.get('http://localhost:4243/user')

      .then(res => this.setState({
        userList: res.data,
      }))
  }
  
  render() {
    console.log('userList')
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Inscription Aidant</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Aidant</DialogTitle>
            <DialogContent>
              <ChampsCaregivers /> 
              <Captcha />  
            </DialogContent>
          
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Fermer
            </Button>
            <Button onClick={this.handleValidation} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
