import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
import { displayAppBar } from '../../actions/displayActions';

import './SignInCaregiver.css';

class ForgotPasswordModale extends React.Component {
  state = {
    redirect: false,
    email: '',
  }

  componentDidMount() {
    const { displayAppBar } = this.props;
    displayAppBar(false);
  }

  recordInformations = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  forgotPassword = () => {
    const { email } = this.state;
    const data = { email };
    axios.post(`${getServerAuthority()}/auth/forgotPassword`,
      data).then((res) => {
      console.log(res);
    });
    alert('Un e-mail vient de vous être envoyé afin de renouveller votre mot de passe.');
    this.setState({ redirect: true });
  }

  render() {
    const { open, onClose } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Renouvellement de mot de passe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Afin de renouveller votre mot de passe, merci de bien vouloir indiquer votre adresse mail.
              Un e-mail vous sera envoyé afin d'en créer un nouveau.
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
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.forgotPassword} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ForgotPasswordModale.propTypes = {
  displayAppBar: PropTypes.func.isRequired,
};

export default connect(null, { displayAppBar })(ForgotPasswordModale);
