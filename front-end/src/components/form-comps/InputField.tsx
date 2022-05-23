import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'password';
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, meta] = useField(props.name);

  const { touched, error } = meta;

  return (
    <TextField
      {...field}
      {...props}
      helperText={touched ? error : undefined}
      error={touched && !!error}
    />
  );
};

export default InputField;
