import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import SimpleSelect from './SimpleSelect';
import RadioButton from './RadioButton';
import { renderTextField, radioButton } from './reduxFormElements';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

// valide allows to detect errors (see reduxFormElements.js)
const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
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
    category,
    handleCategory,
    preferenceOfContact,
    handlePreferenceOfContact,
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
            labels={['M.', 'Mme.']}
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
          <SimpleSelect category={category} handleCategory={handleCategory} />
          <Field
            name="email"
            component={renderTextField}
            label="Email"
            required
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
          <Field
            name="phone"
            component={renderTextField}
            label="Téléphone"
            required={false}
          />
          <RadioButton
            preferenceOfContact={preferenceOfContact}
            handlePreferenceOfContact={handlePreferenceOfContact}
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
  handleValidation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  handleCategory: PropTypes.func.isRequired,
  preferenceOfContact: PropTypes.string.isRequired,
  handlePreferenceOfContact: PropTypes.func.isRequired,
};

// const mapDispatchToProps = (dispatch)  => ({

// });

// ContactModal = connect(mapStateToProps, null)(ContactModal);


export default reduxForm({
  form: 'ContactModal', // a unique identifier for this form
  validate,
})(ContactModal);
