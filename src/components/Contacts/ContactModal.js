import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { renderTextField, renderRadioButton, renderSelectField } from '../reduxFormElements';

let isSMS = 'phone';


// validate allows to detect errors (see reduxFormElements.js)
const validate = (formProps) => {
  const errors = {};
  if (Object.entries(formProps).length) {
    const entries = Object.entries(formProps);
    for (let i = 0; i < entries.length; i++) {
      const field = entries[i][0];

      if ((field === 'phone' && field === isSMS) || (field === 'email' && field === isSMS) || (field !== 'phone' && field !== 'email')) {
        if (!entries[i][1]) {
          errors[field] = 'Champs requis';
        }
      }
    }
    if (
      formProps.email
      && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)
    ) {
      errors.email = 'Adresse email invalide';
    }
    if (
      formProps.phone
      && !/^((?:\+33\s|\+33|0)[1-9](((?:\s\d{2})|(\d{2})){4}))$/i.test(formProps.phone)
    ) {
      errors.phone = 'Numéro de téléphone invalide';
    }
  }
  return errors;
};

class ContactModal extends Component {
  componentDidMount() {
    const { selectedContact, initialize } = this.props;
    const initData = {
      lastName: selectedContact ? selectedContact.lastName : '',
      firstName: selectedContact ? selectedContact.firstName : '',
      address: selectedContact ? selectedContact.address : '',
      category: selectedContact ? selectedContact.category : '',
      phone: selectedContact ? selectedContact.phone : '',
      email: selectedContact ? selectedContact.email : '',
    };
    initialize(initData);
  }

  render() {
    const {
      contactModalIsOpen,
      handleClose,
      handleAddContact,
      handleEditContact,
      classes,
      selectedContact,
      selectedId,
      redux,
      invalid,
      submitting,
      pristine,
    } = this.props;
    return (
      <div>
        {/* {redux.preferenceOfContact === 'Mail' ? isSMS === 'email' : isSMS === 'phone'} */}
        <Dialog
          open={contactModalIsOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          {selectedContact !== null
            ? <DialogTitle id="form-dialog-title"> Modifier le contact</DialogTitle>
            : <DialogTitle id="form-dialog-title"> Ajouter un contact</DialogTitle>
          }
          <DialogContent>
            {/* renderRadioButton render a Material UI renderRadioButton */}
            {/* See reduxFormElements component */}
            <Field
              name="title"
              component={renderRadioButton}
              label="Titre"
              buttonLabels={['Mme', 'M.']}
              required
              initialValue={
                selectedContact !== null
                  ? selectedContact.title
                  : undefined
              }
            />
            {/* renderTextField render a Material UI textField */}
            {/* See reduxFormElements component */}
            <Field
              name="lastName"
              component={renderTextField}
              label="Nom"
              required
              defaultValue={
                selectedContact !== null ? selectedContact.lastName : ''
              }
            />
            <Field
              name="firstName"
              component={renderTextField}
              label="Prénom"
              required
              defaultValue={
                selectedContact !== null ? selectedContact.firstName : ''
              }
            />
            <Field
              classes={classes}
              name="category"
              component={renderSelectField}
              label="Catégorie"
              required
              defaultValue={
                selectedContact !== null ? selectedContact.category : ''
              }
            >
              <option value="" />
              <option value="Médical">Médical</option>
              <option value="Paramédical">Paramédical</option>
              <option value="Proches">Proches</option>
              <option value="Autre">Autre</option>
            </Field>
            <Field
              name="profession"
              component={renderTextField}
              label="Fonction"
              required={false}
              defaultValue={
                selectedContact !== null ? selectedContact.profession : ''
              }
            />
            <Field
              name="address"
              component={renderTextField}
              label="Adresse"
              required
              defaultValue={
                selectedContact !== null ? selectedContact.address : ''
              }
            />
            <Field
              name="preferenceOfContact"
              component={renderRadioButton}
              label="Préférence de contact"
              buttonLabels={['SMS', 'Mail']}
              // onClick={isSMS === 'email'}
              required
              onChange={() => { isSMS = isSMS === 'email' ? 'phone' : 'email'; }}
              initialValue={
                selectedContact !== null
                  ? selectedContact.preferenceOfContact
                  : 'SMS'
              }
            />
            <Field
              name="phone"
              component={renderTextField}
              label="Téléphone"
              required={redux.preferenceOfContact !== 'Mail'}
              defaultValue={
                selectedContact !== null ? selectedContact.phone : ''
              }
            />
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              // onChange={isSMS === 'email'}
              required={redux.preferenceOfContact === 'Mail'}
              defaultValue={
                selectedContact === null ? '' : selectedContact === undefined ? '' : selectedContact.email
              }
            />
            <Field
              name="comment"
              component={renderTextField}
              label="Commentaire"
              required={false}
              defaultValue={
                selectedContact !== null ? selectedContact.comment : ''
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={() => (selectedContact ? handleEditContact(selectedId) : handleAddContact())} color="primary" disabled={invalid || submitting || pristine}>
              {selectedContact !== null
                ? <p>Modifier</p>
                : <p>Valider</p>
              }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  redux: {
    email: formValueSelector('contactModal')(state, 'email'),
    phone: formValueSelector('contactModal')(state, 'phone'),
    preferenceOfContact: formValueSelector('contactModal')(state, 'preferenceOfContact'),
  },
});

export default reduxForm({
  form: 'contactModal', // a unique identifier for this form
  validate,
})(connect(mapStateToProps, null)((ContactModal)));
