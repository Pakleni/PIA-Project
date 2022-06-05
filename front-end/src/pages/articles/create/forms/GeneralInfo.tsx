import { Grid } from '@mui/material';
import React from 'react';
import InputField from '../../../../components/form-comps/InputField';

const GeneralInfo: React.FC = () => {
  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <InputField name="username" label="Username" />
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralInfo;
