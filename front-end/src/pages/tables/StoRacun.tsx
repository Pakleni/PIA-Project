import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { User } from '../../types/User';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Items from './forms/Items';
import { ISto } from '.';
import { IPredracun } from '../../types/PreBill';
import { post_predracun, put_predracun } from '../../api/predracun';

interface StoRacunProps {
  user: User;
  sto: ISto;
  prebills: IPredracun[];
}

const initialError = {
  error: false,
  message: ''
};

const StoRacun: React.FC<StoRacunProps> = ({ user, sto, prebills }) => {
  const zauzet = prebills.find((z) => z.sto === sto.id);

  const initialValues = zauzet
    ? zauzet
    : {
        stavke: [],
        selected_article: '',
        magacin_id: ''
      };

  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    setMessage(initialError);
    try {
      await (zauzet
        ? put_predracun(zauzet._id, { ...data, sto: sto.id })
        : post_predracun(user._id, { ...data, sto: sto.id }));

      data;
      setMessage({
        error: false,
        message: 'Success!'
      });
    } catch (e) {
      setMessage({
        error: true,
        message: JSON.parse(e as string).message as string
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper>
        <Box p={4} width={'100%'}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={Yup.object().shape({
              stavke: Yup.array()
                .of(
                  Yup.object().shape({
                    naziv_artikla: Yup.string(),
                    magacin_id: Yup.string(),
                    kolicina: Yup.string(),
                    prodajna_cena: Yup.string(),
                    porez: Yup.string()
                  })
                )
                .required(),
              selected_article: Yup.string(),
              selected_mag: Yup.string(),
              kolicina: Yup.string().matches(/^[0-9]+$/, 'Must be only digits')
            })}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Items:</Typography>
                  </Grid>
                  <Items user={user} zauzet={!!zauzet} />
                </Grid>
                <Grid item xs={12}>
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? <CircularProgress /> : 'Submit'}
                  </Button>
                </Grid>
                {message && !isSubmitting && (
                  <Grid item xs={12}>
                    <Typography color={message.error ? 'error' : 'green'}>
                      {message.message}
                    </Typography>
                  </Grid>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};
export default StoRacun;
