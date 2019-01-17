import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
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
import Captcha from './Captcha';

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
    value: 'female',
    valueContact: 'sms',
    caregivers: [],
    title: '',
    lastName: '',
    firstname: '',
    email: '',
    phone: '',
    password: '',
    preferenceOfContact: '',
  };

  handleChangeTitle = (e) => {
    this.setState({ value: e.target.value });
  };

  handleChangeContact = (e) => {
    this.setState({ valueContact: e.target.value });
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
    const { value, valueContact } = this.state;
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
                value={value}
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
                value={value}
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
            <FormControl component="fieldset" className={classes.contactPreference}>
              <FormLabel component="legend">Préférence de contact</FormLabel>
              <RadioGroup
                aria-label="Titre"
                name="gender1"
                className={classes.group}
                value={valueContact}
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
                value={valueContact}
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
      </div>
    );
  }
}


export default withStyles(styles)(SignUpCaregiver);
