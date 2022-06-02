import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputField from '../components/form-comps/InputField';
import { register } from '../api/user';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import * as Yup from 'yup';

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
      await register(username, password);
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
          password: Yup.string().required(),
          repeat_password: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords must match'
          )
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Typography variant="h3">Register Admin</Typography>
              </Grid>
              <Grid item>
                <InputField name="username" label="Username" />
              </Grid>
              <Grid item>
                <InputField name="password" label="Password" type="password" />
              </Grid>
              <Grid item>
                <InputField
                  name="repeat_password"
                  label="Repeat Password"
                  type="password"
                />
              </Grid>
              <Grid item>
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? <CircularProgress /> : 'Submit'}
                </Button>
              </Grid>
              {message && !isSubmitting && (
                <Grid item>
                  <Typography color={message.error ? 'error' : 'green'}>
                    {message.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AdminSignup;
