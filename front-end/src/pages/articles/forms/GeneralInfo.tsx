import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import { useField } from 'formik';
import React from 'react';
import InputTextField from '../../../components/form-comps/InputTextField';
import SelectField from '../../../components/form-comps/SelectField';
import { User } from '../../../types/User';

interface GeneralInfoProps {
  user: User;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ user }) => {
  const [field] = useField('tip');
  return (
    <>
      <Grid item xs={12}>
        <InputTextField name="sifra" label="Code" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="naziv" label="Name" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="jedinica" label="Jedinica Mere" />
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
          <FormControl>
            <FormLabel>Tip</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              {...field}
            >
              <FormControlLabel
                value="hrana"
                control={<Radio />}
                label="Hrana"
              />
              <FormControlLabel value="pice" control={<Radio />} label="Pice" />
              <FormControlLabel
                value="sirovina"
                control={<Radio />}
                label="Sirovina"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
    </>
  );
};

export default GeneralInfo;
