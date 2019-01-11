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

const EditContactModal = (props) => {
  const {
    editContactModalIsOpen,
    handleClose,
    handleValidation,
    classes,
    selectedEditContact,
  } = props;

  console.log('selectedEditContact : ', selectedEditContact);

  return (
    <div>
      <Dialog
        open={editContactModalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Modifier la fiche contact
          {/* {`${selectedEditContact.firstName} ${selectedEditContact.lastName}`} */}
        </DialogTitle>
        <DialogContent>
          {/* radioButton render a Material UI radioButton */}
          {/* See reduxFormElements component */}
          <Field
            name="title"
            component={radioButton}
            label="Titre"
            buttonLabels={['Mme', 'M.']}
            required={false}
          />
          {/* renderTextField render a Material UI textField */}
          {/* See reduxFormElements component */}
          <Field
            name="firstName"
            component={renderTextField}
            label="Prénom"
            required
          />
          <Field
            name="lastName"
            component={renderTextField}
            label="Nom"
            required
          />
          <Field
            classes={classes}
            name="category"
            component={renderSelectField}
            label="Catégorie"
            required
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
          />
          <Field
            name="phone"
            component={renderTextField}
            label="Téléphone"
            required={false}
          />
          <Field
            name="preferenceOfContact"
            component={radioButton}
            label="Préférence de contact"
            buttonLabels={['SMS', 'Mail']}
            required
          />
          <Field
            name="comment"
            component={renderTextField}
            label="Commentaire"
            required={false}
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
  form: 'EditContactModal', // a unique identifier for this form
  validate,
})(EditContactModal);
