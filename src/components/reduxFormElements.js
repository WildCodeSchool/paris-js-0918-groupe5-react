import React from 'react';
import TextField from '@material-ui/core/TextField';

export const renderTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    helperText={touched && error}
    label={label}
    error={Boolean(touched && invalid)}
    {...input}
    {...custom}
    required={true}
    margin="dense"
    type="text"
    fullWidth
  />
);