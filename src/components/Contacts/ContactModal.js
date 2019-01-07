import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
// import SimpleSelect from './SimpleSelect';
import { renderTextField, radioButton, renderSelectField } from './reduxFormElements';

// valide allows to detect errors (see reduxFormElements.js)
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
  // Vérify if the email has the good format
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Adresse email invalide';
  }
  return errors;
};

const ContactModal = (props) => {
  const {
    modalIsOpen,
    handleClose,
    handleValidation,
    // category,
    // handleCategory,
    classes,
    // preferenceOfContact,
    // handlePreferenceOfContact,
  } = props;

  return (
    <div>
      <Dialog
        open={modalIsOpen}
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
            buttonLabels={['Mme', 'M']}
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
          {/* <SimpleSelect category={category} handleCategory={handleCategory} /> */}
          <Field
            classes={classes}
            name="category"
            component={renderSelectField}
            label="Catégorie"
            required
          >
            <option value="" />
            <option value="doctor">Médecin</option>
            <option value="nurse">Infirmer</option>
            <option value="gardener">Jardinier</option>
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

ContactModal.propTypes = {
  classes: PropTypes.func.isRequired,
  handleValidation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  // handleCategory: PropTypes.func.isRequired,
  // preferenceOfContact: PropTypes.string.isRequired,
  // handlePreferenceOfContact: PropTypes.func.isRequired,
};

// const mapDispatchToProps = (dispatch)  => ({

// });

// ContactModal = connect(mapStateToProps, null)(ContactModal);


export default reduxForm({
  form: 'ContactModal', // a unique identifier for this form
  validate,
})(ContactModal);
