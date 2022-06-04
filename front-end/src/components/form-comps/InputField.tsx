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
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, meta] = useField(props.name);

  const { touched, error } = meta;

  const { startAdornment, endAdornment, ...rest } = props;

  return (
    <TextField
      {...field}
      {...rest}
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

export default InputField;
