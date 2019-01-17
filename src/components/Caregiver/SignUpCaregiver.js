import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import getServerAuthority from '../../config/getServerAuthority';
import SignInCaregiverAfterSignUp from './SignInCaregiverAfterSignUp';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  legendPoint: {
    color: 'white',
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  contactPreference: {
    marginTop: '1.5em',
  },
  lastNameField: {
    marginTop: '0em',
  },
});

class SignUpCaregiver extends React.Component {
  state = {
    title: 'female',
    preferenceOfContact: 'sms',
    openSignIn: false,
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    dataCaregiver: {},
  };

  handleCloseConnection = () => {
    this.setState({ openSignIn: false });
  };

  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  handleChangeContact = (e) => {
    this.setState({ preferenceOfContact: e.target.value });
  };

  handleChangeFields = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleValidation = () => {
    const data = this.state;
    axios.post(`${getServerAuthority()}/auth/signup`, data)
      .then(res => this.setState({
        dataCaregiver: res.data,
      }));
    this.props.onCloseSignUp();
    this.setState({ openSignIn: true });
  }

  render() {
    const { openSignUp, onCloseSignUp, classes } = this.props;
    const { title, preferenceOfContact, openSignIn } = this.state;
    return (
      <div className={classes.root}>
        <Dialog
          open={openSignUp}
          onClose={onCloseSignUp}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Inscription</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset" className={classes.titleCaregiver}>
              <FormLabel component="legend">Titre</FormLabel>
              <RadioGroup
                aria-label="Titre"
                name="gender1"
                className={classes.group}
                value={title}
                onChange={this.handleChangeTitle}
              >
                <FormControlLabel value="female" control={<Radio />} label="Mme" />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.titleCaregiver}>
              <FormLabel component="legendPoint"> .</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender2"
                className={classes.group}
                value={title}
                onChange={this.handleChangeTitle}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="M."
                />
              </RadioGroup>
            </FormControl>
            <TextField
              className="lastNameField"
              margin="dense"
              id="standard-lastName"
              label="Nom"
              type="text"
              name="lastName"
              onChange={this.handleChangeFields}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-firstName"
              label="Prénom"
              type="text"
              name="firstName"
              onChange={this.handleChangeFields}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-email"
              label="Adresse mail"
              type="email"
              name="email"
              onChange={this.handleChangeFields}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-password"
              label="Mot de passe"
              type="password"
              name="password"
              onChange={this.handleChangeFields}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-password"
              label="Confirmation de mot de passe"
              type="password"
              name="passwordConfirmation"
              onChange={this.handleChangeFields}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-address"
              label="Adresse"
              type="text"
              name="address"
              onChange={this.handleChangeFields}
              fullWidth
            />
            <TextField
              margin="dense"
              id="standard-phone"
              label="Téléphone"
              type="text"
              name="phone"
              onChange={this.handleChangeFields}
              fullWidth
            />
            <FormControl component="fieldset" className={classes.contactPreference}>
              <FormLabel component="legend">Préférence de contact</FormLabel>
              <RadioGroup
                aria-label="Titre"
                name="gender1"
                className={classes.group}
                value={preferenceOfContact}
                onChange={this.handleChangeContact}
              >
                <FormControlLabel value="sms" control={<Radio />} label="SMS" />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.contactPreference}>
              <FormLabel component="legendPoint"> .</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender2"
                className={classes.group}
                value={preferenceOfContact}
                onChange={this.handleChangeContact}
              >
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
              </RadioGroup>
            </FormControl>
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
        <SignInCaregiverAfterSignUp openSignIn={openSignIn} onCloseSignIn={this.handleCloseConnection} />
      </div>
    );
  }
}

export default withStyles(styles)(SignUpCaregiver);
