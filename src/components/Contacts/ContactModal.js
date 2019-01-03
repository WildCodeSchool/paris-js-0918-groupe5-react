import React from 'react';
import { 
  TextField,
  Dialog,
  Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
// import SimpleSelect from './SimpleSelect';
// import RadioButton from './RadioButton';

const validate = (values) => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);

const ContactModal = (props) => {
  const {
    modalIsOpen,
    handleClose,
    handleSubmit,
    pristine,
    reset,
    submitting,
  } = props;

  return (
    <div>
      <Dialog
        open={modalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="firstName"
              component={renderTextField}
              label="First Name"
            />
          </div>
          <div>
            <Field name="lastName" component={renderTextField} label="Last Name" />
          </div>
          <div>
            <Field name="email" component={renderTextField} label="Email" />
          </div>
          <div>
            <Field name="employed" component={renderCheckbox} label="Employed" />
          </div>
          <div>
            <Field
              name="notes"
              component={renderTextField}
              label="Notes"
              multiLine={true}
              rows={2}
            />
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

ContactModal.propTypes = {
  handleValidation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  handleChangeFirstName: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  handleChangeLastName: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  handleCategory: PropTypes.func.isRequired,
  preferenceOfContact: PropTypes.string.isRequired,
  handlePreferenceOfContact: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'formContact', // a unique identifier for this form
  validate,
})(ContactModal);
