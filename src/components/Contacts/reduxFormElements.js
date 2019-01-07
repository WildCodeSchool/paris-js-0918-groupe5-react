import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

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

// export const radioButton = ({
//   input,
//   label,
//   meta: { touched, invalid, error },
//   ...custom
// }) => (
//   <Radio value={label} label={label} />
// );

export const radioButton = ({ input, labels, ...rest }) => (
  // <FormControl>
  //   <RadioGroup {...input} {...rest}>
  // <FormControlLabel value={label} control={<Radio />} label={label} />
  //   </RadioGroup>
  // </FormControl>

  <FormControl>
    <RadioGroup {...input} {...rest}>
      {labels.map(label => (
        <FormControlLabel key={`${label}`} value={label} control={<Radio />} label={label} />
      ))}
    </RadioGroup>
  </FormControl>


);


// const renderRadioGroup = ({ input, ...rest }) =>
//   <RadioButtonGroup
//     {...input}
//     {...rest}
//     valueSelected={input.value}
//     onChange={(event, value) => input.onChange(value)}
//   />