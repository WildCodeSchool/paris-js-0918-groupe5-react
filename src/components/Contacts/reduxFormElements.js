import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'

export const renderTextField = ({
  input,
  label,
  required,
  meta: { touched, invalid, error },
  ...custom
}) => (
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
  />
);

export const radioButton = ({ 
  input, required, label, buttonLabels, ...rest
}) => (
  <FormControl>
    <FormLabel component="legend" required={required}>{label}</FormLabel>
    <RadioGroup {...input} {...rest}>
      {buttonLabels.map(e => (
        <FormControlLabel value={e} control={<Radio />} label={e} />
      ))}
    </RadioGroup>
  </FormControl>
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
};


export const renderSelectField = ({
  input,
  required,
  label,
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
        id: 'age-native-simple'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);
