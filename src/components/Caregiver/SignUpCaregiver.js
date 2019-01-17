import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import getServerAuthority from '../../config/getServerAuthority';
import ChampsCaregivers from './ChampsCaregiver';
import Captcha from './Captcha';


class SignUpCaregiver extends React.Component {
  state = {
    open: false,
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
    const { openSignUp, onCloseSignUp } = this.props;
    return (
      <div>
        <Dialog
          open={openSignUp}
          onClose={onCloseSignUp}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Inscription</DialogTitle>
          <DialogContent>
            <ChampsCaregivers />
            <Captcha />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseSignUp} color="primary">
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

export default SignUpCaregiver;
