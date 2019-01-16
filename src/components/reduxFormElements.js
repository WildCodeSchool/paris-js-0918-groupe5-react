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
// import classes from '*.module.css';

export const renderTextField = ({
  input,
  label,
  required,
  value,
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
    value={value}
  />
);

export const renderRadioButton = ({
  input,
  label,
  required,
  value,
  buttonLabels,
  ...rest
}) => (
  <div>
    <FormControl>
      <FormLabel component="legend" required={required} className="radioButtonsLabel">
        {label}
      </FormLabel>
      <RadioGroup {...input} {...rest} value={value} row>
        {buttonLabels.map(e => (
          <FormControlLabel
            key={e}
            value={e}
            control={
              <Radio />
            }
            label={e}
            className="radioButtonsGroup"
          />
        ))}
      </RadioGroup>
    </FormControl>
  </div>
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
    {renderFromHelper({ touched, error })}
  </FormControl>
);
