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
import Payment from './forms/Payment';
import Items, { price } from './forms/Items';
import { new_bill } from '../../api/bill';
import { Bill } from '../../types/Bill';

interface BillsPageProps {
  user: User;
}

const initialValues = {
  nacin: '',
  vrednost: '',
  broj_lk: '',
  broj_slip_racuna: '',
  ime: '',
  prezime: '',
  narucioc: '',
  stavke: [],
  selected_article: '',
  selected_mag: ''
};

const initialError = {
  error: false,
  message: ''
};

const BillsPage: React.FC<BillsPageProps> = ({ user }) => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    setMessage(initialError);
    try {
      await new_bill(user._id, data as unknown as Bill);
      data;
      setMessage({
        error: false,
        message: 'Success!'
      });
    } catch (e) {
      setMessage({
        error: true,
        message: e as string
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
              nacin: Yup.string().required(),
              vrednost: Yup.string().when(['nacin'], (nacin: string) => {
                if (nacin === 'gotovina') return Yup.string().required();
                else return Yup.string();
              }),
              broj_lk: Yup.string().when(['nacin'], (nacin: string) => {
                if (['kartica', 'cek'].find((x) => x === nacin))
                  return Yup.string().required();
                else return Yup.string();
              }),
              broj_slip_racuna: Yup.string().when(
                ['nacin'],
                (nacin: string) => {
                  if (nacin === 'kartica') return Yup.string().required();
                  else return Yup.string();
                }
              ),
              ime: Yup.string().when(['nacin'], (nacin: string) => {
                if (nacin === 'cek') return Yup.string().required();
                else return Yup.string();
              }),
              prezime: Yup.string().when(['nacin'], (nacin: string) => {
                if (nacin === 'cek') return Yup.string().required();
                else return Yup.string();
              }),
              narucioc: Yup.string().when(['nacin'], (nacin: string) => {
                if (nacin === 'virman') return Yup.string().required();
                else return Yup.string();
              }),
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
            {({ values, isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Items:</Typography>
                  </Grid>
                  <Items user={user} />
                  <Grid item xs={12}>
                    <Typography variant="h4">Payment:</Typography>
                  </Grid>
                  <Payment />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={
                      isSubmitting ||
                      (values.nacin === 'gotovina' &&
                        !!values.vrednost &&
                        parseFloat(values.vrednost) <
                          values.stavke.reduce((a, x) => a + price(x), 0))
                    }
                    type="submit"
                  >
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
export default BillsPage;
