import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icons from '../Icons';
import FieldModifyUser from './FieldModifyUser';
import getServerAuthority from '../../config/getServerAuthority';

class MyAccountModale extends React.Component {
  state = {
    openFieldModifyAccount: false,
    selectedCaregiver: {},
    lastName: 'Nom',
    firstName: 'Prénom',
    address: 'Adresse',
    phone: 'Téléphone',
    mail: 'Email',
    password: 'Mot de passe',
    numberOfSubscriptions: 'Nombre d\'abonnements',
    selectedField: '',
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const url = `${getServerAuthority()}/users/caregiver`;
    console.log('url', url);
    axios({
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => this.setState({ selectedCaregiver: res.data }));
  }

  openFieldModifyAccount = (name) => {
    this.setState({ selectedField: name }, () => this.setState({ openFieldModifyAccount: true }));
  }

  handleCloseFieldModifyAccount = () => {
    this.setState({ openFieldModifyAccount: false });
  };

  recordNewInformations = () => {
    this.setState({ openFieldModifyAccount: false });
    this.props.onClose();
    alert('Vos modifications ont bien été enregistrées.');
  }

  render() {
    const { open, onClose } = this.props;
    const {
      openFieldModifyAccount, lastName, firstName, address, phone, mail, password, numberOfSubscriptions, selectedField, selectedCaregiver
    } = this.state;
    console.log(selectedCaregiver);
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleCloseModale}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Mon compte</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vous trouverez ci-dessous vos informations personnelles.
              <br />
              Si vous souhaitez les modifier, nous vous invitons à cliquer sur le bouton "Modifier".
            </DialogContentText>
            <h4>{lastName}</h4>
            <p>
              Jolivet
              <IconButton onClick={() => this.openFieldModifyAccount(lastName)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{firstName}</h4>
            <p>
              Karine
              <IconButton onClick={() => this.openFieldModifyAccount(firstName)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{address}</h4>
            <p>
              11 rue de poissy Paris
              <IconButton onClick={() => this.openFieldModifyAccount(address)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{phone}</h4>
            <p>
              0606060606
              <IconButton onClick={() => this.openFieldModifyAccount(phone)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{mail}</h4>
            <p>
              karine@jolivet.com
              <IconButton onClick={() => this.openFieldModifyAccount(mail)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{password}</h4>
            <p>
              *****
              <IconButton onClick={() => this.openFieldModifyAccount(password)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{numberOfSubscriptions}</h4>
            <p>2</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
        <FieldModifyUser openField={openFieldModifyAccount} onClose={this.handleCloseFieldModifyAccount} selectedField={selectedField} onCloseAll={this.recordNewInformations} />
      </div>
    );
  }
}

export default MyAccountModale;
