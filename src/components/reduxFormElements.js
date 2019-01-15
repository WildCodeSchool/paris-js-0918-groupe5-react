import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

export const renderTextField = ({
  input,
  label,
  required,
  value,
  meta: { touched, invalid, error },
  ...custom
}) => {
  console.log('text', value);
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

export const radioButton = ({
  input,
  label,
  required,
  initialValue,
  buttonLabels,
  ...rest
}) => {
  console.log('input', input.value);
  return (
    <FormControl>
      <FormLabel component="legend" required={required}>
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
