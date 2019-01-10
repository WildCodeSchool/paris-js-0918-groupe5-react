import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Adresse email invalide';
  }
  return errors;
};

const AddContactModal = (props) => {
  const {
    addContactModalIsOpen,
    handleClose,
    handleValidation,
    classes,
  } = props;

  return (
    <div>
      <Dialog
        open={addContactModalIsOpen}
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
  form: 'AddContactModal', // a unique identifier for this form
  validate,
})(AddContactModal);
