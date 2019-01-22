import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Field,
  reduxForm,
  formValueSelector,
  reset,
} from 'redux-form';
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
import { getReceivers, getSelectedReceiver } from '../../actions/infoActions';
import { displayDialogReceiver } from '../../actions/displayActions';

const token = localStorage.getItem('token');

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'title',
    'lastName',
    'firstName',
    'address',
    'phone',
    'dateOfBirth',
    'receiverBond',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Champs requis';
    }
  });
  // Verify if the email has the good format
  // if (
  //   values.phone
  //   && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(values.phone)
  // ) {
  //   errors.email = 'Numéro de téléphone invalide';
  // }
  return errors;
};

class DialogReceiver extends Component {
  handleValidation = () => {
    const {
      redux,
      displayDialogReceiver,
      receiver,
      reset,
    } = this.props;

    const newReceiver = redux.receiver;
    if (!receiver) {
      newReceiver.title = redux.receiver.title || 'Mme';
    } else {
      newReceiver.title = redux.receiver.title || receiver.title;
    }

    axios({
      method: receiver ? 'PUT' : 'POST',
      url: receiver ? `${getServerAuthority()}/users/receiver/${receiver.id}` : `${getServerAuthority()}/users/receivers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: newReceiver,
    })
      .then(res => res.data)
      .then((resReceiver) => {
        const { getReceivers } = this.props;
        getReceivers();
        return resReceiver;
      })
      .then((resReceiver) => {
        const { getSelectedReceiver } = this.props;
        console.log('resReceiver', resReceiver.id);
        getSelectedReceiver(resReceiver.id);
      })
      .then(() => { reset('receiverForm'); })
      .then(() => displayDialogReceiver(false));
  };

  handleClose = () => {
    const { displayDialogReceiver } = this.props;
    displayDialogReceiver(false);
  }

  render() {
    const { redux, receiver } = this.props;
    return (
      <div className="DialogReceiver">
        <Dialog
          open={redux.dialogReceiverIsDisplayed}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {receiver && `Modifier le profil de ${receiver.firstName}`}
            {!receiver && 'Ajouter un aidé'}
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
    dialogReceiverIsDisplayed: state.display.dialogReceiverIsDisplayed,
    receiver: {
      title: formValueSelector('receiverForm')(state, 'title'),
      lastName: formValueSelector('receiverForm')(state, 'lastName'),
      firstName: formValueSelector('receiverForm')(state, 'firstName'),
      address: formValueSelector('receiverForm')(state, 'address'),
      phone: formValueSelector('receiverForm')(state, 'phone'),
      dateOfBirth: formValueSelector('receiverForm')(state, 'dateOfBirth'),
      receiverBond: formValueSelector('receiverForm')(state, 'receiverBond'),
    },
    selectedReceiver: state.info.selectedReceiver,
  },
});

export default reduxForm({
  form: 'receiverForm', // a unique identifier for this form
  validate,
})((connect(mapStateToProps, {
  displayDialogReceiver,
  getReceivers,
  getSelectedReceiver,
  reset,
}))(DialogReceiver));
