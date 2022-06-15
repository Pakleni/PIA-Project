import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputField from '../components/form-comps/InputField';
import { register_corp } from '../api/user';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { validatePassword } from '../utils/yup-helpers';

const initialValues = {
  username: '',
  password: '',
  repeat_password: '',
  ime: '',
  prezime: '',
  telefon: '',
  email: '',
  naziv: '',
  adresa: '',
  pib: '',
  maticni_broj: '',
  grb: null
};

const initialError = {
  error: false,
  message: ''
};

const CorpSignup: React.FC = () => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    setMessage(initialError);
    try {
      await register_corp(data);
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
    <Box p={4} width={'100%'}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          username: Yup.string().required(),
          password: validatePassword,
          repeat_password: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords must match'
          ),
          ime: Yup.string().required(),
          prezime: Yup.string().required(),
          telefon: Yup.string()
            .required()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(8, 'Not less than 8 digits')
            .max(9, 'Not more than 9 digits'),
          email: Yup.string().email().required(),
          naziv: Yup.string().required(),
          adresa: Yup.string().required(),
          pib: Yup.string()
            .required()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .matches(/^[1-9][0-9]+$/, "Can't start with 0")
            .min(9, '9 digits')
            .max(9, '9 digits'),
          maticni_broj: Yup.string().required(),
          grb: Yup.mixed()
            .required()
            .test('type', 'Must be jpeg/png', (value) => {
              return (
                (value && value.type === 'image/jpeg') ||
                (value && value.type === 'image/png')
              );
            })
            .test('size', 'Must be 100x100-300x300', (value) => {
              //TODO add size requirements
              return true || value;
            })
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Container maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Register Corporation</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputField name="username" label="Username" />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    name="repeat_password"
                    label="Repeat Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="ime" label="Ime" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="prezime" label="Prezime" />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    name="telefon"
                    label="Telefon"
                    startAdornment="+381"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="naziv" label="Naziv" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="adresa" label="Adresa" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="pib" label="PIB" />
                </Grid>
                <Grid item xs={12}>
                  <InputField name="maticni_broj" label="Maticni broj" />
                </Grid>
                <Grid item xs={12}>
                  <InputField type="file" name="grb" label="Grb" shrink />
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
              </Grid>
            </Container>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CorpSignup;
