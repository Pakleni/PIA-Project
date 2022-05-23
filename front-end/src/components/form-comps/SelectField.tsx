import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface SelectFieldProps {
  name: string;
  label: string;
  data: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ name, label, data }) => {
  const [field, meta] = useField(name);

  const { touched, error } = meta;
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select {...field}>
        {data.map((x, i) => (
          <MenuItem key={i}>{x.label}</MenuItem>
        ))}
      </Select>
      {touched && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
