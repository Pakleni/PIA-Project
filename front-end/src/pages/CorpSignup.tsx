import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputTextField from '../components/form-comps/InputTextField';
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
import { imageDimensionCheck, validatePassword } from '../utils/yup-helpers';
import FileUpload from '../components/form-comps/FileUpload';

const initialValues = {
  username: '',
  password: '',
  repeat_password: '',
  ime: '',
  prezime: '',
  telefon: '',
  email: '',
  naziv: '',
  drzava: '',
  grad: '',
  postanski_broj: '',
  ulica_broj: '',
  pib: '',
  maticni_broj: '',
  grb: ''
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
        message: JSON.parse(e as string)?.message as string
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
          drzava: Yup.string().required(),
          grad: Yup.string().required(),
          postanski_broj: Yup.string().required(),
          ulica_broj: Yup.string().required(),
          pib: Yup.string()
            .required()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .matches(/^[1-9][0-9]+$/, "Can't start with 0")
            .min(9, '9 digits')
            .max(9, '9 digits'),
          maticni_broj: Yup.string().required(),
          grb: Yup.mixed()
            .test('type', 'Must be jpeg/png', (value) => {
              return (
                !value ||
                (value && value.type === 'image/jpeg') ||
                (value && value.type === 'image/png')
              );
            })
            .test(
              'size',
              'Brtween 100x100 and 300x300',
              imageDimensionCheck(100, 100, 300, 300)
            )
            .required()
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
                  <InputTextField name="username" label="Username" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="repeat_password"
                    label="Repeat Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="ime" label="Ime" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="prezime" label="Prezime" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="telefon"
                    label="Telefon"
                    startAdornment="+381"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="naziv" label="Naziv" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="drzava" label="Drzava" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="grad" label="Grad" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="postanski_broj"
                    label="Postanski broj"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="ulica_broj" label="Ulica i Broj" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="pib" label="PIB" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="maticni_broj" label="Maticni broj" />
                </Grid>
                <Grid item xs={12}>
                  <FileUpload name="grb" label="Grb" />
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
