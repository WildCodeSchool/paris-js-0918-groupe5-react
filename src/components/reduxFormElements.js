import React from 'react';
import './ReduxFormElements.css';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';


export const renderTextField = ({
  input,
  label,
  required,
  value,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <TextField
      helperText={touched && error}
      label={label}
      error={Boolean(touched && invalid)}
      {...input}
      {...custom}
      required={required}
      margin="dense"
      type="text"
      fullWidth
      value={value}
    />
  );
};

export const renderRadioButton = ({
  input,
  label,
  required,
  initialValue,
  buttonLabels,
  ...rest

}) => {
  return (
    <FormControl>
      <FormLabel component="legend" required={required} className="radioButtonsLabel">
        {label}
      </FormLabel>
      <RadioGroup
        {...input}
        {...rest}
        value={input.value.length === 0
          ? initialValue === undefined
            ? buttonLabels[0]
            : initialValue
          : input.value}
        row
      >
        {buttonLabels.map(e => (
          <FormControlLabel
            key={e}
            value={e}

            control={<Radio />}
            label={e}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const renderFormHelper = ({ touched, error }) => {
  return <FormHelperText>{touched && error}</FormHelperText>;
};

export const renderSelectField = ({
  input,
  label,
  required,
  value,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple" required={required}>{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: 'age',
        id: 'age-native-simple',
      }}
      value={value}
    >
      {children}
    </Select>
    {touched && error && renderFormHelper({ touched, error })}
  </FormControl>
);

export const renderDatePicker = ({
  input,
  label,
  required,
  meta: { touched, error, invalid },
  children,
  ...custom
}) => (
  <form noValidate>
    <TextField
      helperText={touched && error}
      label={label}
      error={Boolean(touched && invalid)}
      type="date"
      {...input}
      {...custom}
      required={required}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </form>
);
