import { Grid } from '@mui/material';
import React from 'react';
import CheckboxField from '../../../components/form-comps/CheckboxField';
import InputField from '../../../components/form-comps/InputField';

const AddedInfo: React.FC = () => {
  return (
    <>
      <Grid item xs={12}>
        <InputField name="poreklo" label="Poreklo" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="strani_naziv" label="Strani Naziv" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="barkod" label="Barkod" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="proizvodjac" label="Proizvodjac" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="tarifa" label="Tarifa" />
      </Grid>
      <Grid item xs={12}>
        <CheckboxField name="eko_taksa" label="Eko taksa" />
      </Grid>
      <Grid item xs={12}>
        <CheckboxField name="akcize" label="Akcize" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="min_zalihe" label="Min Zalihe" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="max_zalihe" label="Max Zalihe" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="opis" label="Opis" />
      </Grid>
      <Grid item xs={12}>
        <InputField name="deklaracija" label="Deklaracija" />
      </Grid>
    </>
  );
};

export default AddedInfo;
