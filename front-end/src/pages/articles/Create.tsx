import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { User } from '../../types/User';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import AddedInfo from './forms/AddedInfo';
import GeneralInfo from './forms/GeneralInfo';
import PricesStates from './forms/PricesStates';
import { addArticle } from '../../api/articles';
import { imageDimensionCheck } from '../../utils/yup-helpers';

interface CreateArticlesProps {
  user: User;
}

const initialError = {
  error: false,
  message: ''
};

const CreateArticles: React.FC<CreateArticlesProps> = ({ user }) => {
  const initialValues = {
    sifra: '',
    naziv: '',
    jedinica: '',
    stopa: user.pdv ? '' : '0%',
    tip: user.kategorija === 'ugostitelj' ? 'hrana' : '',
    poreklo: '',
    strani_naziv: '',
    barkod: '',
    proizvodjac: '',
    tarifa: '',
    eko_taksa: false,
    akcize: false,
    min_zalihe: '',
    max_zalihe: '',
    opis: '',
    deklaracija: '',
    cene_stanje: user.magacini.map((x) => ({
      magacin_id: x.id,
      nabavna_cena: '',
      prodajna_cena: '',
      stanje: '',
      min_zalihe: '',
      max_zalihe: ''
    })) as {
      magacin_id: string;
      nabavna_cena: string;
      prodajna_cena: string;
      stanje: string;
      min_zalihe: string;
      max_zalihe: string;
    }[],
    slicica: null
  };

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
      await addArticle(user._id, data);
      console.log(data);
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
    <Container maxWidth="sm">
      <Box py={5}>
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
          validationSchema={
            [
              Yup.object().shape({
                sifra: Yup.string().required(),
                stopa: Yup.string().required(),
                naziv: Yup.string().required(),
                jedinica: Yup.string().required(),
                tip:
                  user.kategorija === 'ugostitelj'
                    ? Yup.string().required()
                    : Yup.string()
              }),
              Yup.object().shape({
                poreklo: Yup.string(),
                strani_naziv: Yup.string(),
                barkod: Yup.string().matches(/^[0-9]+$/, 'Must be only digits'),
                proizvodjac: Yup.string(),
                tarifa: Yup.string(),
                eko_taksa: Yup.boolean(),
                akcize: Yup.boolean(),
                min_zalihe: Yup.string().matches(
                  /^[0-9]+$/,
                  'Must be only digits'
                ),
                max_zalihe: Yup.string().matches(
                  /^[0-9]+$/,
                  'Must be only digits'
                ),
                opis: Yup.string(),
                deklaracija: Yup.string(),
                slicica: Yup.mixed()
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
              }),
              Yup.object().shape({
                cene_stanje: Yup.array()
                  .of(
                    Yup.object().shape({
                      magacin_id: Yup.string().required(),
                      nabavna_cena: Yup.string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .required(),
                      prodajna_cena: Yup.string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .required(),
                      stanje: Yup.string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .required(),
                      min_zalihe: Yup.string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .required(),
                      max_zalihe: Yup.string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .required()
                    })
                  )
                  .required()
              })
            ][step]
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Add Article</Typography>
                </Grid>
                {step === 0 ? (
                  <GeneralInfo user={user} />
                ) : step === 1 ? (
                  <AddedInfo />
                ) : (
                  <PricesStates user={user} />
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
      </Box>
    </Container>
  );
};

export default CreateArticles;
