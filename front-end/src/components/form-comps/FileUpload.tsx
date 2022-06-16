import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React from 'react';

interface FileUploadProps {
  name: string;
  label: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ name, label, disabled }) => {
  const [, meta] = useField(name);

  const { setFieldTouched, setFieldValue } = useFormikContext();
  const { touched, error } = meta;

  const myError = touched ? error : undefined;
  return (
    <>
      <FormControl error={!!myError} fullWidth>
        <InputLabel shrink>{label}</InputLabel>
        <Input
          name={name}
          disabled={disabled}
          type="file"
          fullWidth
          disableUnderline
          onBlur={() => {
            setFieldTouched(name, true);
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.currentTarget.files?.[0]) {
              setFieldValue(name, event.currentTarget.files[0], true);
            } else {
              setFieldValue(name, '', true);
            }
          }}
        />
        {!!myError && <FormHelperText>{myError}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default FileUpload;
