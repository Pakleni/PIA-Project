import { Grid, Typography } from '@mui/material';
import React from 'react';
import InputTextField from '../../../components/form-comps/InputTextField';
import { User } from '../../../types/User';

interface PricesStatesProps {
  user: User;
}

const PricesStates: React.FC<PricesStatesProps> = ({ user }) => {
  return (
    <>
      {user.magacini.map((x, i) => (
        <React.Fragment key={i}>
          <Grid item xs={12}>
            <Typography variant="h6">{x.naziv}</Typography>
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              name={`cene_stanje[${i}].nabavna_cena`}
              label="Nabavna Cena"
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              name={`cene_stanje[${i}].prodajna_cena`}
              label="Prodajna Cena"
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField name={`cene_stanje[${i}].stanje`} label="Stanje" />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              name={`cene_stanje[${i}].min_zalihe`}
              label="Min zalihe"
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              name={`cene_stanje[${i}].max_zalihe`}
              label="Maks zalihe"
            />
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
};

export default PricesStates;
