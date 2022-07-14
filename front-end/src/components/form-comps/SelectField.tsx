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
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  data,
  disabled
}) => {
  const [field, meta] = useField(name);

  const { touched, error } = meta;
  return (
    <FormControl
      fullWidth
      error={touched ? !!error : undefined}
      disabled={disabled}
    >
      <InputLabel>{label}</InputLabel>
      <Select {...field} fullWidth>
        {data.map((x, i) => (
          <MenuItem key={i} value={x.value}>
            {x.label}
          </MenuItem>
        ))}
      </Select>
      {touched && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
