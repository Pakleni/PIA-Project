import { InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  type?: 'text' | 'number' | 'password';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  shrink?: boolean;
}

const InputTextField: React.FC<InputFieldProps> = (props) => {
  const [field, meta] = useField(props.name);

  const { touched, error } = meta;

  const { startAdornment, endAdornment, shrink, ...rest } = props;

  return (
    <TextField
      {...field}
      {...rest}
      InputLabelProps={{ shrink }}
      fullWidth
      helperText={touched ? error : undefined}
      error={touched && !!error}
      InputProps={{
        startAdornment: startAdornment && (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        )
      }}
    />
  );
};

export default InputTextField;
