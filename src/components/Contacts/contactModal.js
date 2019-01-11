import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, radioButton, renderSelectField } from '../reduxFormElements';

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
    handleValidation,
    classes,
    selectedEditContact,
  } = props;

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
          {/* radioButton render a Material UI radioButton */}
          {/* See reduxFormElements component */}
          <Field
            name="title"
            component={radioButton}
            label="Titre"
            buttonLabels={['Mme', 'M.']}
            required
            defaultValue={
              selectedEditContact !== null ? selectedEditContact.title : ''
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
              selectedEditContact !== null ? selectedEditContact.firstName : ''
            }
          />
          <Field
            name="lastName"
            component={renderTextField}
            label="Nom"
            required
            defaultValue={
              selectedEditContact !== null ? selectedEditContact.lastName : ''
            }
          />
          <Field
            classes={classes}
            name="category"
            component={renderSelectField}
            label="Catégorie"
            required
            defaultValue={
              selectedEditContact !== null ? selectedEditContact.category : ''
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
              selectedEditContact !== null ? selectedEditContact.email : ''
            }
          />
          <Field
            name="phone"
            component={renderTextField}
            label="Téléphone"
            required={false}
            defaultValue={
              selectedEditContact !== null ? selectedEditContact.phone : ''
            }
          />
          <Field
            name="preferenceOfContact"
            component={radioButton}
            label="Préférence de contact"
            buttonLabels={['SMS', 'Mail']}
            required
            defaultValue={
              selectedEditContact !== null ? selectedEditContact.preferenceOfContact : ''
            }
          />
          <Field
            name="comment"
            component={renderTextField}
            label="Commentaire"
            required={false}
            defaultValue={
              selectedEditContact !== null ? selectedEditContact.comment : ''
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleValidation} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// const mapStateToProps = state => ({
//   title: state.form.title,
//   firstName: state.form.firstName,
// });

export default reduxForm({
  form: 'contactModal', // a unique identifier for this form
  validate,
})(contactModal);
