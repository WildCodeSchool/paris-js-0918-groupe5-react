import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
// import getServerAuthority from '../../config/getServerAuthority';
import {
  renderTextField,
  renderDatePicker,
  radioButton,
} from '../reduxFormElements';
import { displayAddReceiverDialog } from '../../actions/displayActions';

// const token = localStorage.getItem('token');

const validate = (values) => {};

class DialogAddReceiver extends Component {
  handleAddReceiver = () => {
    const { redux, displayAddReceiverDialog } = this.props;
    const receiver = { ...redux.receiver };
    console.log(receiver);
    displayAddReceiverDialog(false);

    // axios({
    //   method: 'POST',
    //   url: `${getServerAuthority()}/users/receivers`,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   data: receiver,
    // })
    //   .then(res => console.log(res.data))
    //   .then(() => {
    //     const { displayAddReceiverDialog } = this.props;
    //     displayAddReceiverDialog(false);
    //   });
  };

  handleClose = () => {
    const { displayAddReceiverDialog } = this.props;
    displayAddReceiverDialog(false);
  }

  render() {
    const { redux } = this.props;
    return (
      <div className="DialogAddReceiver">
        <Dialog
          open={redux.dialogAddReceiverIsDisplayed}
          // onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Ajouter un aidé</DialogTitle>
          <DialogContent>
            <Field
              name="title"
              component={radioButton}
              label="Titre"
              buttonLabels={['Mme', 'M.']}
              required
            />
            <Field
              name="lastName"
              component={renderTextField}
              label="Nom"
              required
            />
            <Field
              name="firstName"
              component={renderTextField}
              label="Prénom"
              required
            />
            <Field
              name="address"
              component={renderTextField}
              label="Adresse"
              required
            />
            <Field
              name="phone"
              component={renderTextField}
              label="Téléphone"
              required
            />
            <Field
              name="dateOfBirth"
              component={renderDatePicker}
              label="Date de naissance"
              required
            />
            <Field
              name="receiverBond"
              component={renderTextField}
              label="Lien de parenté"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleAddReceiver} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redux: {
    dialogAddReceiverIsDisplayed: state.display.dialogAddReceiverIsDisplayed,
    receiver: {
      title: formValueSelector('AddReceiverForm')(state, 'title'),
      lastName: formValueSelector('AddReceiverForm')(state, 'lastName'),
      firstName: formValueSelector('AddReceiverForm')(state, 'firstName'),
      address: formValueSelector('AddReceiverForm')(state, 'address'),
      phone: formValueSelector('AddReceiverForm')(state, 'phone'),
      dateOfBirth: formValueSelector('AddReceiverForm')(state, 'dateOfBirth'),
      receiverBond: formValueSelector('AddReceiverForm')(state, 'receiverBond'),
    },
  },
});

export default reduxForm({
  form: 'AddReceiverForm', // a unique identifier for this form
  validate,
})((connect(mapStateToProps, { displayAddReceiverDialog }))(DialogAddReceiver));
