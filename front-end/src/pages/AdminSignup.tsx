import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputTextField from '../components/form-comps/InputTextField';
import { register_admin } from '../api/user';
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
  repeat_password: ''
};

const initialError = {
  error: false,
  message: ''
};

const AdminSignup: React.FC = () => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async ({ username, password }: typeof initialValues) => {
    setMessage(initialError);
    try {
      await register_admin(username, password);
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
          )
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Container maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Register Admin</Typography>
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

export default AdminSignup;
