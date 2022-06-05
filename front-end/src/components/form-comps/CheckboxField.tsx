import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useField } from 'formik';
import { FormControlLabel, FormGroup } from '@mui/material';

interface CheckboxFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
}
const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  disabled
}) => {
  const [field] = useField(name);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox checked={field.value} disabled={disabled} {...field} />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default CheckboxField;
