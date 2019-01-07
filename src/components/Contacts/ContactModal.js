import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import SimpleSelect from './SimpleSelect';
import RadioButton from './RadioButton';
import { renderTextField } from './reduxFormElements';

// valide allows to detect errors (see reduxFormElements.js)
const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Champs requis';
    }
  });
  // if (
  //   values.email &&
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  // ) {
  //   errors.email = 'Invalid email address'
  // }
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
          <Field
            name="title"
            component={renderTextField}
            label="titre"
            // value={title}
          />
          {/* <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="FirstName"
            type="text"
            fullWidth
            value={firstName}
            onChange={handleChangeFirstName}
          /> */}
          {/* renderTextField render a Material UI textField */}
          {/* See reduxFormElements component */}
          <Field
            name="firstName"
            component={renderTextField}
            label="Prénom"
          />
          <Field
            name="lastName"
            component={renderTextField}
            label="Nom"
          />
          <SimpleSelect category={category} handleCategory={handleCategory} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Téléphone"
            type="text"
            fullWidth
          />
          <RadioButton
            preferenceOfContact={preferenceOfContact}
            handlePreferenceOfContact={handlePreferenceOfContact}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Commentaire"
            type="text"
            fullWidth
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
