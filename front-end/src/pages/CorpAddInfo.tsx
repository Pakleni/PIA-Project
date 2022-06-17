import React, { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import SelectField from '../components/form-comps/SelectField';
import AutocompleteField from '../components/form-comps/AutocompleteField';
import { sifre_delatnosti } from '../utils/sifre';
import CheckboxField from '../components/form-comps/CheckboxField';
import InputTextField from '../components/form-comps/InputTextField';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../types/User';
import { add_corp_info } from '../api/user';

const initialValues = {
  kategorija: '',
  sifra_delatnosti: [],
  pdv: false,
  racun_broj: '',
  racun_banka: '',
  racuni: [] as {
    broj: string;
    banka: string;
  }[],
  magacin_id: '',
  magacin_naziv: '',
  magacini: [] as {
    id: string;
    naziv: string;
  }[],
  kasa_lokacija: '',
  kasa_tip: '',
  kase: [] as {
    lokacija: string;
    tip: string;
  }[]
};

const initialError = {
  error: false,
  message: ''
};

interface CorpAddInfoProps {
  user: User;
  Login: () => Promise<void>;
}
const CorpAddInfo: React.FC<CorpAddInfoProps> = ({ user, Login }) => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: {
    kategorija: string;
    sifra_delatnosti: never[];
    pdv: boolean;
    racuni: {
      broj: string;
      banka: string;
    }[];
    magacini: {
      id: string;
      naziv: string;
    }[];
    kase: {
      lokacija: string;
      tip: string;
    }[];
  }) => {
    setMessage(initialError);
    try {
      await add_corp_info(user._id, data);
      setMessage({
        error: false,
        message: 'Success!'
      });
      await Login();
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
          kategorija: Yup.string().required(),
          sifra_delatnosti: Yup.array()
            .of(Yup.number())
            .min(1, 'Minimum 1')
            .required(),
          pdv: Yup.boolean(),
          // 111-111111111111-11
          racun_broj: Yup.string().matches(
            /^[0-9]{3}-[0-9]{12}-[0-9]{2}$/,
            'DDD-DDDDDDDDDDDD-DD'
          ),
          racuni: Yup.array()
            .of(
              Yup.object().shape({
                broj: Yup.string().required(),
                banka: Yup.string().required()
              })
            )
            .min(1, 'Minimum 1')
            .required(),
          magacini: Yup.array()
            .of(
              Yup.object().shape({
                id: Yup.string().required(),
                naziv: Yup.string().required()
              })
            )
            .min(1, 'Minimum 1')
            .required(),
          magacin_id: Yup.string().when(
            ['magacini'],
            (
              magacini: {
                id: string;
                naziv: string;
              }[]
            ) => {
              return Yup.string().notOneOf(
                magacini.map((x) => x.id),
                "Id can't be same"
              );
            }
          ),
          kase: Yup.array()
            .of(
              Yup.object().shape({
                lokacija: Yup.string().required(),
                tip: Yup.string().required()
              })
            )
            .min(1, 'Minimum 1')
            .required()
        })}
      >
        {({ isSubmitting, setFieldValue, values, errors, setFieldTouched }) => (
          <Form>
            <Container maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Add Company Info</Typography>
                </Grid>
                <Grid item xs={12}>
                  <SelectField
                    name="kategorija"
                    label="Category"
                    data={[
                      { value: 'prodavnica', label: 'Shop' },
                      { value: 'ugostitelj', label: 'Restaurant' }
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteField
                    name="sifra_delatnosti"
                    label="Codes"
                    data={sifre_delatnosti}
                    multiple
                  />
                </Grid>
                <Grid item xs={12}>
                  <CheckboxField name="pdv" label="PDV" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Account</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="racun_broj" label="Account number" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="racun_banka" label="Account bank" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={
                      !values.racun_broj ||
                      !values.racun_banka ||
                      !!errors.racun_broj ||
                      !!errors.racun_banka
                    }
                    onClick={() => {
                      setFieldValue('racuni', [
                        ...values.racuni,
                        {
                          broj: values.racun_broj,
                          banka: values.racun_banka
                        }
                      ]);
                      setFieldTouched('racuni', true, false);
                      setFieldValue('racun_broj', '');
                      setFieldValue('racun_banka', '');
                    }}
                  >
                    ADD
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <ul>
                    {values.racuni.map((x, i) => (
                      <li key={i}>
                        <Typography>
                          number: {x.broj} | bank: {x.banka}
                          <IconButton
                            onClick={() => {
                              setFieldValue(
                                'racuni',
                                values.racuni.filter((y) => y != x)
                              );
                            }}
                          >
                            <CloseIcon color="error" />
                          </IconButton>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <ErrorMessage name="racuni">
                    {(msg) => <Typography color="error">{msg}</Typography>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Cashbox</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="kasa_lokacija"
                    label="Cashbox location"
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectField
                    name="kasa_tip"
                    label="Cashbox type"
                    data={[
                      { value: '1', label: 'Type 1' },
                      { value: '2', label: 'Type 2' },
                      { value: '3', label: 'Type 3' }
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={
                      !values.kasa_lokacija ||
                      !values.kasa_tip ||
                      !!errors.kasa_lokacija ||
                      !!errors.kasa_tip
                    }
                    onClick={() => {
                      setFieldValue('kase', [
                        ...values.kase,
                        {
                          lokacija: values.kasa_lokacija,
                          tip: values.kasa_tip
                        }
                      ]);
                      setFieldTouched('kase', true, false);
                      setFieldValue('kasa_lokacija', '');
                      setFieldValue('kasa_tip', '');
                    }}
                  >
                    ADD
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <ul>
                    {values.kase.map((x, i) => (
                      <li key={i}>
                        <Typography>
                          location: {x.lokacija} | type: {x.tip}
                          <IconButton
                            onClick={() => {
                              setFieldValue(
                                'kase',
                                values.kase.filter((y) => y != x)
                              );
                            }}
                          >
                            <CloseIcon color="error" />
                          </IconButton>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <ErrorMessage name="kase">
                    {(msg) => <Typography color="error">{msg}</Typography>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Storage</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="magacin_id" label="Storage id" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="magacin_naziv" label="Storage name" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={
                      !values.magacin_id ||
                      !values.magacin_naziv ||
                      !!errors.magacin_id ||
                      !!errors.magacin_naziv
                    }
                    onClick={() => {
                      setFieldValue('magacini', [
                        ...values.magacini,
                        {
                          id: values.magacin_id,
                          naziv: values.magacin_naziv
                        }
                      ]);
                      setFieldTouched('magacini', true, false);
                      setFieldValue('magacin_id', '');
                      setFieldTouched('magacin_id', false);
                      setFieldValue('magacin_naziv', '');
                      setFieldTouched('magacin_naziv', false);
                    }}
                  >
                    ADD
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <ul>
                    {values.magacini.map((x, i) => (
                      <li key={i}>
                        <Typography>
                          id: {x.id} | name: {x.naziv}
                          <IconButton
                            onClick={() => {
                              setFieldValue(
                                'magacini',
                                values.magacini.filter((y) => y != x)
                              );
                            }}
                          >
                            <CloseIcon color="error" />
                          </IconButton>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <ErrorMessage name="magacini">
                    {(msg) => <Typography color="error">{msg}</Typography>}
                  </ErrorMessage>
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

export default CorpAddInfo;
