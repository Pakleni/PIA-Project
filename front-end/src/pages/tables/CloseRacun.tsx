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
import { Bill } from '../../types/Bill';
import { get_price } from '../../utils/bills';
import { IPredracun } from '../../types/PreBill';
import { close_predracun } from '../../api/predracun';

interface BillsPageProps {
  user: User;
  prebill: IPredracun;
  onClose: () => void;
}

const initialError = {
  error: false,
  message: ''
};

const CloseRacun: React.FC<BillsPageProps> = ({ user, prebill, onClose }) => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    setMessage(initialError);
    try {
      await close_predracun(
        user._id,
        prebill._id,
        data as unknown as IPredracun
      );
      data;
      setMessage({
        error: false,
        message: 'Success!'
      });

      onClose();
    } catch (e) {
      setMessage({
        error: true,
        message: JSON.parse(e as string)?.message as string
      });
    }
  };

  const initialValues = {
    ...prebill,
    nacin: '',
    vrednost: '',
    broj_lk: '',
    broj_slip_racuna: '',
    ime: '',
    prezime: '',
    narucioc: ''
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
                if (nacin === 'gotovina')
                  return Yup.string()
                    .matches(/^[0-9]+$/, 'Must be only digits')
                    .required();
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
              })
            })}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4">Payment:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Total Price:{' '}
                      {get_price(prebill as unknown as Bill).toLocaleString()}
                      din
                    </Typography>
                  </Grid>
                  <Payment user={user} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={
                      isSubmitting ||
                      (values.nacin === 'gotovina' &&
                        !!values.vrednost &&
                        parseFloat(values.vrednost) <
                          get_price(values as unknown as Bill))
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
export default CloseRacun;
