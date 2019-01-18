import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import getServerAuthority from '../../config/getServerAuthority';
import {
  renderTextField,
  renderDatePicker,
  renderRadioButton,
} from '../reduxFormElements';
import { getReceivers } from '../../actions/infoActions';
import { displayDialogAddReceiver } from '../../actions/displayActions';

const token = localStorage.getItem('token');

const validate = (values) => {};

class DialogReceiver extends Component {
  handleValidation = () => {
    const { redux, displayDialogAddReceiver, receiver } = this.props;

    const newReceiver = receiver || redux.receiver;
    if (!receiver) {
      newReceiver.title = redux.receiver.title || 'Mme';
    }

    axios({
      method: receiver ? 'PUT' : 'POST',
      url: receiver ? `${getServerAuthority()}/users/receiver/${receiver.id}` : `${getServerAuthority()}/users/receivers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: redux.receiver,
    })
      .then(() => {
        const { getReceivers } = this.props;
        getReceivers();
      })
      .then(() => displayDialogAddReceiver(false));
  };

  handleClose = () => {
    const { displayDialogAddReceiver } = this.props;
    displayDialogAddReceiver(false);
  }

  render() {
    const { redux, receiver } = this.props;
    return (
      <div className="DialogReceiver">
        <Dialog
          open={redux.dialogAddReceiverIsDisplayed}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {receiver && `Modifier le profil de ${receiver.firstName}`}
            {!receiver && "Ajouter un aidé"}
          </DialogTitle>
          <DialogContent>
            <Field
              name="title"
              component={renderRadioButton}
              label="Titre"
              buttonLabels={['Mme', 'M.']}
              required
              initialValue={receiver ? receiver.title : undefined}
            />
            <Field
              name="lastName"
              component={renderTextField}
              label="Nom"
              required
              defaultValue={receiver ? receiver.lastName : ''}
            />
            <Field
              name="firstName"
              component={renderTextField}
              label="Prénom"
              required
              defaultValue={receiver ? receiver.firstName : ''}
            />
            <Field
              name="address"
              component={renderTextField}
              label="Adresse"
              required
              defaultValue={receiver ? receiver.address : ''}
            />
            <Field
              name="phone"
              component={renderTextField}
              label="Téléphone"
              required
              defaultValue={receiver ? receiver.phone : ''}
            />
            <Field
              name="dateOfBirth"
              component={renderDatePicker}
              label="Date de naissance"
              required
              defaultValue={receiver ? receiver.dateOfBirth : ''}
            />
            <Field
              name="receiverBond"
              component={renderTextField}
              label="Lien de parenté"
              required
              defaultValue={receiver ? receiver.receiverBond : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleValidation} color="primary">
              {receiver && 'Editer'}
              {!receiver && 'Ajouter'}
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
})((connect(mapStateToProps, { displayDialogAddReceiver, getReceivers }))(DialogReceiver));
