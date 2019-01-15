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
    name: 'Nom',
    address: 'Adresse',
    phone: 'Téléphone',
    mail: 'Email',
    password: 'Mot de passe',
    numberOfSubscriptions: 'Nombre d\'abonnements',
    selectedField: '',
  }

  componentDidMount() {
    const id = localStorage.getItem('id');
    axios.get(`${getServerAuthority()}/caregiver/${id}`)
      .then(res => console.log(res));
  }

  openFieldModifyAccount = (e) => {
    this.setState({ openFieldModifyAccount: true, selectedField: e.target.name });
  }

  handleCloseFieldModifyAccount = () => {
    this.setState({ openFieldModifyAccount: false });
  };

  recordNewInformations = () => {
    this.setState({ openFieldModifyAccount: false });
    this.props.onClose();
  }

  render() {
    const { open, onClose } = this.props;
    const {
      openFieldModifyAccount, name, address, phone, mail, password, numberOfSubscriptions, selectedField,
    } = this.state;
    console.log(selectedField);
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
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            /> */}
            <h4>{name}</h4>
            <p>
              Jolivet Karine
              <IconButton name="Nom" selectedField={selectedField} onClick={this.openFieldModifyAccount}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{address}</h4>
            <p>
              11 rue de poissy Paris
              <IconButton name="Adresse">
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{phone}</h4>
            <p>
              0606060606
              <IconButton name="Téléphone">
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{mail}</h4>
            <p>
              karine@jolivet.com
              <IconButton name="Email">
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>{password}</h4>
            <p>
              *****
              <IconButton name="Mot de passe">
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
