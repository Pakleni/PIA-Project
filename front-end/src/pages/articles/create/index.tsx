import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { User } from '../../../types/User';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import AddedInfo from './forms/AddedInfo';
import GeneralInfo from './forms/GeneralInfo';
import PricesStates from './forms/PricesStates';

interface CreateArticlesProps {
  user: User;
}

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

const CreateArticles: React.FC<CreateArticlesProps> = ({ user }) => {
  const steps = ['General Info', 'Added Info', 'Prices and States'];

  const [step, setStep] = useState(0);

  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    if (step != 2) {
      setStep(step + 1);
      return;
    }
    setMessage(initialError);
    try {
      //   await register_user(data);
      data;
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
    <Container maxWidth="sm">
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
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
                <Grid item xs={12}>
                  <Typography variant="h3">Register User</Typography>
                </Grid>
                {step === 0 ? (
                  <GeneralInfo />
                ) : step === 1 ? (
                  <AddedInfo />
                ) : (
                  <PricesStates />
                )}
                <Grid item xs={12}>
                  <Button
                    disabled={step == 0}
                    onClick={() => setStep(step - 1)}
                    variant="contained"
                  >
                    Back
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? (
                      <CircularProgress />
                    ) : step != 2 ? (
                      'Next'
                    ) : (
                      'Submit'
                    )}
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
      </Paper>
    </Container>
  );
};

export default CreateArticles;
