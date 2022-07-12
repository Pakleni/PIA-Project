import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { User } from '../../types/User';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import InputTextField from '../../components/form-comps/InputTextField';
import { add_odeljenje } from '../../api/user';

interface CreateCategoriesProps {
  user: User;
  onClose: () => void;
}

const initialError = {
  error: false,
  message: ''
};

const CreateCategories: React.FC<CreateCategoriesProps> = ({
  user,
  onClose
}) => {
  const initialValues = {
    naziv: ''
  };

  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    setMessage(initialError);
    try {
      await add_odeljenje(user, data.naziv);
      console.log(data);
      setMessage({
        error: false,
        message: 'Success!'
      });
      onClose();
    } catch (e) {
      setMessage({
        error: true,
        message: (JSON.parse(e) as { message: string }).message || (e as string)
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box py={5}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={Yup.object().shape({
            naziv: Yup.string().required()
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Dodaj Odeljenje</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="naziv" label="Naziv" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
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
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default CreateCategories;
