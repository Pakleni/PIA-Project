import React from 'react';
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

interface Props {
  name: string;
  label: string;
  disabled?: boolean;
  multiple?: boolean;
  data: string[];
}

const SelectCountry: React.FC<Props> = (props) => {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const { touched, error } = meta;

  const myError = touched ? error : undefined;
  return (
    <FormControl error={!!myError} fullWidth>
      <Autocomplete
        fullWidth
        {...field}
        {...rest}
        onBlur={() => {
          setFieldTouched(rest.name, true);
        }}
        onChange={(event, newValue) => {
          setFieldValue(rest.name, newValue);
        }}
        options={data}
        renderInput={(params) => (
          <TextField {...params} label={label} error={!!myError} />
        )}
      />
      {!!myError && <FormHelperText>{myError}</FormHelperText>}
    </FormControl>
  );
};

export default SelectCountry;
