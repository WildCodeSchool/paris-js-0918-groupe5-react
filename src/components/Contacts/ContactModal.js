import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, renderRadioButton, renderSelectField } from '../reduxFormElements';

// validate allows to detect errors (see reduxFormElements.js)
const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'category',
    'preferenceOfContact',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Champs requis';
    }
  });
  // Verify if the email has the good format
  if (
    values.email
    && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Adresse email invalide';
  }
  return errors;
};

const contactModal = (props) => {
  const {
    contactModalIsOpen,
    handleClose,
    handleAddContact,
    handleEditContact,
    classes,
    selectedContact,
    selectedId,
  } = props;

  if (selectedContact) {
    console.log('title : ', selectedContact.title, 'preferenceOfContact : ', selectedContact.preferenceOfContact);
  }

  return (
    <div>
      <Dialog
        open={contactModalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ajouter un contact professionnel
        </DialogTitle>
        <DialogContent>
          {/* renderRadioButton render a Material UI renderRadioButton */}
          {/* See reduxFormElements component */}
          <Field
            name="title"
            component={renderRadioButton}
            label="Titre"
            buttonLabels={['Mme', 'M.']}
            required
            defaultValue={
              selectedContact !== null
                ? 'Mme'
                : ''
            }
          />
          {/* renderTextField render a Material UI textField */}
          {/* See reduxFormElements component */}
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
            name="lastName"
            component={renderTextField}
            label="Nom"
            required
            defaultValue={
              selectedContact !== null ? selectedContact.lastName : ''
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
            name="email"
            component={renderTextField}
            label="Email"
            required
            defaultValue={
              selectedContact !== null ? selectedContact.email : ''
            }
          />
          <Field
            name="phone"
            component={renderTextField}
            label="Téléphone"
            required={false}
            defaultValue={
              selectedContact !== null ? selectedContact.phone : ''
            }
          />
          <Field
            name="preferenceOfContact"
            component={renderRadioButton}
            label="Préférence de contact"
            buttonLabels={['SMS', 'Mail']}
            required
            defaultValue={
              selectedContact !== null ? selectedContact.preferenceOfContact : ''
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
          <Button onClick={() => (selectedContact ? handleEditContact(selectedId) : handleAddContact())} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default reduxForm({
  form: 'contactModal', // a unique identifier for this form
  validate,
})(contactModal);
