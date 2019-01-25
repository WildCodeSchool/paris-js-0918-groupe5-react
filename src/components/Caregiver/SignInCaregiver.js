import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import getServerAuthority from '../../config/getServerAuthority';
import { getReceivers, getSelectedReceiver } from '../../actions/infoActions';
import ForgotPasswordModal from './ForgotPasswordModal';


import './SignInCaregiver.css';

class SignInCaregiver extends React.Component {
  state = {
    redirect: false,
    openForgotPassword: false,
    email: '',
    password: '',
  }

  handleClickForgotPassword = () => {
    this.setState({ openForgotPassword: true });
  };

  handleCloseForgotPassword = () => {
    this.setState({ openForgotPassword: false });
  };

  recordInformations = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    const data = { email, password };
    axios
      .post(`${getServerAuthority()}/auth/signin`,
        data).then((res) => {
        localStorage.setItem('token', res.headers['x-access-token']);
        localStorage.setItem('id', res.id);
      })
      .then(() => {
        const { getReceivers } = this.props;
        getReceivers();
      })
      // .then(() => {
      //   const { redux, getSelectedReceiver } = this.props;
      //   if (redux.selectedReceiverId > 0) {
      //     getSelectedReceiver(redux.selectedReceiverId);
      //   }
      // })
      .then(() => {
        this.setState({ redirect: true });
      });
  };

  forgotPassword = () => {
    const { email } = this.state;
    const data = { email };
    axios.post(`${getServerAuthority()}/auth/forgotPassword`,
      data).then((res) => {
      console.log(res);
    // console.log('token', localStorage.getItem('token'));
    });
  }

  render() {
    const { openSignIn, onCloseSignIn } = this.props;
    const { redirect, openForgotPassword } = this.state;
    if (redirect) {
      return (
        <Redirect to="/tableau_de_bord" />
      );
    }
    return (
      <div>
        <Dialog
          open={openSignIn}
          onClose={onCloseSignIn}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Connexion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour vous connecter, merci de rentrer votre adresse mail et votre mot de passe.
            </DialogContentText>
            <TextField
              margin="dense"
              id="email"
              label="Adresse mail"
              type="email"
              name="email"
              onChange={this.recordInformations}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Mot de passe"
              type="password"
              name="password"
              onChange={this.recordInformations}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button className="forgottenPassword" onClick={this.handleClickForgotPassword} color="primary">
              Mot de passe oublié ?
            </Button>
            <Button onClick={onCloseSignIn} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Se connecter
            </Button>
          </DialogActions>
        </Dialog>
        <ForgotPasswordModal open={openForgotPassword} onClose={this.handleCloseForgotPassword} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redux: {
    selectedReceiverId: state.info.selectedReceiverId,
  },
});

export default connect(
  mapStateToProps,
  { getReceivers, getSelectedReceiver },
)(SignInCaregiver);
