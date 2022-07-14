import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputTextField from '../components/form-comps/InputTextField';
import { register_user } from '../api/user';
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
  broj_lk: ''
};

const initialError = {
  error: false,
  message: ''
};

const UserSignup: React.FC = () => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    setMessage(initialError);
    try {
      await register_user(data);
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
          broj_lk: Yup.string()
            .required()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(13, 'Must be exactly 13 digits')
            .max(13, 'Must be exactly 13 digits')
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Container maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Register User</Typography>
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
                  <InputTextField name="broj_lk" label="Broj Licne" />
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

export default UserSignup;
