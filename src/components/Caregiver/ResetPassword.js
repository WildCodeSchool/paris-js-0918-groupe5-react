import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import getServerAuthority from '../../config/getServerAuthority';

class ResetPassword2 extends React.Component {
  state ={
    password: '',
    passwordVerify: '',
    open: true,
    redirect: false,
    openSignIn: false,
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  recordPassword = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  changePassword = (e) => {
    e.preventDefault();
    const { password, passwordVerify } = this.state;
    const token = this.props.match.params.token;
    console.log('-------------------', token);

    if (password === passwordVerify) {
      axios({
        method: 'PUT',
        url: `${getServerAuthority()}/auth/reset`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { password },
      })
        .then((res) => {
          console.log('reeeeees', res);
        });
      alert('Votre mot de passe a bien été modifié');
      this.setState({ redirect: true, openSignIn: true });
    } else {
      alert('Les mots de passe ne correspondent pas, merci de rééssayer.')
    }
  }

  render() {
    const { open, redirect } = this.state;
    if (redirect) {
      return (<Redirect to="/" />);
    }
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Renouvellement votre de mot de passe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nous vous invitons à indiquer votre nouveau mot de passe.
            </DialogContentText>
            <TextField
              margin="dense"
              id="password"
              label="Mot de passe"
              type="password"
              name="password"
              onChange={this.recordPassword}
              fullWidth
            />
            <TextField
              margin="dense"
              id="passwordVerify"
              label="Confirmation du mot de passe"
              type="password"
              name="passwordVerify"
              onChange={this.recordPassword}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.changePassword} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ResetPassword2;
