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

const token = localStorage.getItem('token');
const url = `${getServerAuthority()}/users/caregiver`;

class MyAccountModale extends React.Component {
  state = {
    openFieldModifyAccount: false,
    selectedCaregiver: {},
    lastName: '',
    firstName: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    stateName: '',
    // numberOfSubscriptions: 'Nombre d\'abonnements',
    selectedField: '',
    inputUpdated: '',
  }

  componentDidMount() {
    this.axiosGetting();
  }

  axiosGetting = () => {
    axios({
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => this.setState({ selectedCaregiver: res.data }));
  }

  openFieldModifyAccount = async (name) => {
    await this.setState({ selectedField: name }, () => this.setState({ openFieldModifyAccount: true }));
    switch (this.state.selectedField) {
      case 'Nom':
        this.setState({ stateName: 'lastName' });
        break;
      case 'Prénom':
        this.setState({ stateName: 'firstName' });
        break;
      case 'Adresse':
        this.setState({ stateName: 'address' });
        break;
      case 'Téléphone':
        this.setState({ stateName: 'phone' });
        break;
      case 'Email':
        this.setState({ stateName: 'email' });
        break;
      case 'Mot de passe':
        this.setState({ stateName: 'password' });
        break;
      default:
        break;
    }
  }

  handleCloseFieldModifyAccount = () => {
    this.setState({ openFieldModifyAccount: false });
  };

  recordNewInformations = (fieldName, stateField) => {
    const array = Object.entries(stateField);
    let valueUpdated = {};
    for (let i = 0; i < array.length; i++) {
      if (array[i][1].length) {
        valueUpdated = { [fieldName]: array[i][1] };
      }
    }

    axios({
      method: 'PUT',
      url: `${getServerAuthority()}/users/caregiver`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: valueUpdated,
    })
      .then((res) => {
        this.setState({ inputUpdated: res.data });
      });

    this.setState({ openFieldModifyAccount: false });
    this.props.onClose();
    alert('Vos modifications ont bien été enregistrées.');
    this.axiosGetting();
  }

  render() {
    const { open, onClose } = this.props;
    const {
      openFieldModifyAccount, selectedField, selectedCaregiver, lastName, firstName, address, phone, email, password, stateName,
    } = this.state;
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
            <h4>Nom</h4>
            <p>
              {selectedCaregiver.lastName}
              <IconButton onClick={() => this.openFieldModifyAccount('Nom', lastName)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Prénom</h4>
            <p>
              {selectedCaregiver.firstName}
              <IconButton onClick={() => this.openFieldModifyAccount('Prénom', firstName)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Adresse</h4>
            <p>
              {selectedCaregiver.address}
              <IconButton onClick={() => this.openFieldModifyAccount('Adresse', address)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Téléphone</h4>
            <p>
              {selectedCaregiver.phone}
              <IconButton onClick={() => this.openFieldModifyAccount('Téléphone', phone)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Email</h4>
            <p>
              {selectedCaregiver.email}
              <IconButton onClick={() => this.openFieldModifyAccount('Email', email)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Mot de passe</h4>
            <p>
              *****
              <IconButton onClick={() => this.openFieldModifyAccount('Mot de passe', password)}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            {/* <h4>{numberOfSubscriptions}</h4>
            <p>2</p> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
        <FieldModifyUser
          openField={openFieldModifyAccount}
          onClose={this.handleCloseFieldModifyAccount}
          selectedField={selectedField}
          selectedCaregiver={selectedCaregiver}
          stateName={stateName}
          onCloseAll={this.recordNewInformations}
        />
      </div>
    );
  }
}

export default MyAccountModale;
