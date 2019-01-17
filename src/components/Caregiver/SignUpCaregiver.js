import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import getServerAuthority from '../../config/getServerAuthority';
import ChampsCaregivers from './ChampsCaregiver';
import Captcha from './Captcha';


class SignUpCaregiver extends React.Component {
  state = {
    caregivers: [],
    title: '',
    lastName: '',
    firstname: '',
    email: '',
    phone: '',
    password: '',
    preferenceOfContact: '',
  };

  handleValidation = () => {
    // const {
    //   title, 
    //   lastName, 
    //   firstname, 
    //   email, 
    //   phone, 
    //   password, 
    //   preferenceOfContact } = this.state
    // const newCaregiver = { 
    //   title, 
    //   lastName, 
    //   firstname, 
    //   email, 
    //   phone, 
    //   password, 
    //   preferenceOfContact 
    // }
    axios.post(`${getServerAuthority()}/auth/signup`)
      .then(res => this.setState({
        userList: res.data,
      }));
  }

  render() {
    const { openSignUp, onCloseSignUp, classes } = this.props;
    return (
      <div>
        <Dialog
          open={openSignUp}
          onClose={onCloseSignUp}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Inscription</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="standard-lastName"
              label="Nom"
              type="text"
              name="lastName"
              onChange={this.recordInformations}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-firstName"
              label="Prénom"
              type="text"
              name="firstName"
              onChange={this.recordInformations}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-email"
              label="Adresse mail"
              type="email"
              name="email"
              onChange={this.recordInformations}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-password"
              label="Mot de passe"
              type="password"
              name="password"
              onChange={this.recordInformations}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-password"
              label="Confirmation de mot de passe"
              type="password"
              name="password"
              onChange={this.recordInformations}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-address"
              label="Adresse"
              type="text"
              name="address"
              onChange={this.recordInformations}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-phone"
              label="Téléphone"
              type="text"
              name="phone"
              onChange={this.recordInformations}
              fullWidth
            />
            {/* <ChampsCaregivers /> */}
            {/* <Captcha /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseSignUp} color="primary">
              Fermer
            </Button>
            <Button onClick={this.handleValidation} color="primary">
              S'inscrire
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SignUpCaregiver;
