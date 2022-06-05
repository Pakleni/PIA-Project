import { Grid } from '@mui/material';
import React from 'react';
import InputField from '../../../components/form-comps/InputField';
import SelectField from '../../../components/form-comps/SelectField';
import { User } from '../../../types/User';

interface GeneralInfoProps {
  user: User;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ user }) => {
  return (
    <>
      <Grid item xs={12}>
        <InputField name="sifra" label="Code" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="naziv" label="Name" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="jedinica" label="Jedinica Mere" />
      </Grid>
      <Grid item xs={12}>
        {user.pdv && (
          <SelectField
            name="stopa"
            label="Stopa"
            data={[
              {
                value: '10%',
                label: '10%'
              },
              {
                value: '20%',
                label: '20%'
              }
            ]}
          />
        )}
      </Grid>
      {user.kategorija === 'ugostitelj' && (
        <Grid item xs={12}>
          <InputField name="tip" label="Type" />
        </Grid>
      )}
    </>
  );
};

export default GeneralInfo;
