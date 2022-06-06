import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { User } from '../../types/User';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

interface BillsPageProps {
  user: User;
}

const initialValues = {};

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
      //   await register_admin(username, password);
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
    <Container maxWidth="lg">
      <Box p={4} width={'100%'}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            username: Yup.string().required()
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
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
    </Container>
  );
};
export default BillsPage;