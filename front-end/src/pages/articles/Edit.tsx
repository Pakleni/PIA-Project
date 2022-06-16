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
import { IArtikal } from '../../types/Article';
import { editArticle } from '../../api/articles';
import { imageDimensionCheck } from '../../utils/yup-helpers';

interface EditArticlesProps {
  user: User;
  article: IArtikal;
}

const initialError = {
  error: false,
  message: ''
};

const EditArticles: React.FC<EditArticlesProps> = ({ user, article }) => {
  const initialValues = {
    sifra: article.sifra,
    naziv: article.naziv,
    jedinica: article.jedinica,
    stopa: article.stopa,
    tip: article.tip,
    poreklo: article.poreklo,
    strani_naziv: article.strani_naziv,
    barkod: article.barkod,
    proizvodjac: article.proizvodjac,
    tarifa: article.tarifa,
    eko_taksa: article.eko_taksa,
    akcize: article.akcize,
    min_zalihe: article.min_zalihe,
    max_zalihe: article.max_zalihe,
    opis: article.opis,
    deklaracija: article.deklaracija,
    cene_stanje: article.cene_stanje,
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
      await editArticle(user._id, article._id, data);
      console.log(data);
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
                      nabavna_cena: Yup.string().required(),
                      prodajna_cena: Yup.string().required(),
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
                  <Typography variant="h3">Edit Article</Typography>
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

export default EditArticles;
