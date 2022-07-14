import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputTextField from '../components/form-comps/InputTextField';
import { change_password } from '../api/user';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { User } from '../types/User';
import { validatePassword } from '../utils/yup-helpers';

const initialError = {
  error: false,
  message: ''
};

interface ChangePasswordProps {
  user: User;
  Logout: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ user, Logout }) => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const initialValues = {
    username: user.username,
    password: '',
    new_password: '',
    repeat_password: ''
  };

  const onSubmit = async ({
    username,
    password,
    new_password
  }: typeof initialValues) => {
    setMessage(initialError);
    try {
      await change_password(username, password, new_password);
      setMessage({
        error: false,
        message: 'Success!'
      });
      Logout();
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
          new_password: Yup.string().required(),
          repeat_password: Yup.string().oneOf(
            [Yup.ref('new_password')],
            'Passwords must match'
          )
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Container maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Change Password</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="username" label="Username" disabled />
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
                    name="new_password"
                    label="New Password"
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

export default ChangePassword;
