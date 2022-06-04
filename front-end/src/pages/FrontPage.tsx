import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import InputField from '../components/form-comps/InputField';
import { login } from '../api/user';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { User } from '../types/User';
import * as Yup from 'yup';

const initialValues = {
  username: '',
  password: ''
};

interface FrontPageProps {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const FrontPage: React.FC<FrontPageProps> = ({ setUser }) => {
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async ({ username, password }: typeof initialValues) => {
    setError(false);
    try {
      const response = await login(username, password);
      setUser(response);
      localStorage.setItem('user', JSON.stringify({ username, password }));
    } catch (e) {
      setError(true);
    }
  };

  return (
    <Box p={4} width={'100%'}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          username: Yup.string().required(),
          password: Yup.string().required()
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Container maxWidth="xs">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Login</Typography>
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
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? <CircularProgress /> : 'Submit'}
                  </Button>
                </Grid>
                {error && !isSubmitting && (
                  <Grid item xs={12}>
                    <Typography color="error">
                      Wrong username/password
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

export default FrontPage;
