import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import SimpleSelect from './SimpleSelect';
import RadioButton from './RadioButton';
// import { isThisSecond } from 'date-fns';

class Contacts extends Component {
  state = {
    contactsList: [],
    open: false,
    firstName: '',
    lastName: '',
    communicationPreference: 'sms',
    category: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value }, () => {
      const { firstName } = this.state;
      console.log(firstName);
    });
  };

  handleChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
  };

  handleCommunicationPreference = (e) => {
    this.setState({ communicationPreference: e.target.value });
  };

  handleCategory = (e) => {
    this.setState({ category: e.target.value });
  };

  handleValidation = () => {
    const {
      firstName,
      lastName,
      communicationPreference,
      category,
    } = this.state;
    const contact = {
      firstName,
      lastName,
      preferenceOfContact: communicationPreference,
      category,
    };
    axios.post('http://localhost:4243/contacts', contact);
    console.log(contact);
    this.handleClose();
  };

  componentDidMount() {
    axios.get('http://localhost:4243/contacts')
      .then(res => this.setState({
        contactsList: res.data,
      }));
  }

  render() {
    const { contactsList } = this.state;
    console.log(contactsList)
    // const contactList = contacts.map(e => e);
    // console.log(contactList);

    const {
      open,
      firstName,
      lastName,
      communicationPreference,
      category,
    } = this.state;

    return (
      <div>
        <h2>Liste des contacts</h2>
        
        <Button onClick={this.handleClickOpen}>Ajouter un contact</Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Ajouter un contact professionnel
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Titre"
              type="text"
              fullWidth
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="FirstName"
              type="text"
              fullWidth
              value={firstName}
              onChange={this.handleChangeFirstName}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="LastName"
              type="text"
              fullWidth
              value={lastName}
              onChange={this.handleChangeLastName}
            />
            <SimpleSelect category={category} handleCategory={this.handleCategory} />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Téléphone"
              type="text"
              fullWidth
            />
            <RadioButton communicationPreference={communicationPreference} handleCommunicationPreference={this.handleCommunicationPreference} />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Commentaire"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleValidation} color="primary">
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Contacts;
