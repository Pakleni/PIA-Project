import { Grid } from '@mui/material';
import React from 'react';
import CheckboxField from '../../../components/form-comps/CheckboxField';
import InputTextField from '../../../components/form-comps/InputTextField';

const AddedInfo: React.FC = () => {
  return (
    <>
      <Grid item xs={12}>
        <InputTextField name="poreklo" label="Poreklo" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="strani_naziv" label="Strani Naziv" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="barkod" label="Barkod" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="proizvodjac" label="Proizvodjac" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="tarifa" label="Tarifa" />
      </Grid>
      <Grid item xs={12}>
        <CheckboxField name="eko_taksa" label="Eko taksa" />
      </Grid>
      <Grid item xs={12}>
        <CheckboxField name="akcize" label="Akcize" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="min_zalihe" label="Min Zalihe" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="max_zalihe" label="Max Zalihe" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="opis" label="Opis" />
      </Grid>
      <Grid item xs={12}>
        <InputTextField name="deklaracija" label="Deklaracija" />
      </Grid>
    </>
  );
};

export default AddedInfo;
