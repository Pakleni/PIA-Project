import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputField from '../components/form-comps/InputField';
import { change_password } from '../api/user';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();
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
      history.push('/');
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
          new_password: Yup.string().required(),
          repeat_password: Yup.string().oneOf(
            [Yup.ref('new_password')],
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
                <Typography variant="h3">Change Password</Typography>
              </Grid>
              <Grid item>
                <InputField name="username" label="Username" disabled />
              </Grid>
              <Grid item>
                <InputField name="password" label="Password" type="password" />
              </Grid>
              <Grid item>
                <InputField
                  name="new_password"
                  label="New Password"
                  type="password"
                />
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

export default ChangePassword;
