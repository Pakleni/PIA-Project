import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import InputTextField from '../components/form-comps/InputTextField';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { add_beneficiary, get_all_beneficiaries } from '../api/beneficiaries';
import { INarucioc } from '../types/Beneficiary';
import { User } from '../types/User';

const initialValues = {
  ime: '',
  prezime: '',
  telefon: '',
  email: '',
  naziv: '',
  drzava: '',
  grad: '',
  postanski_broj: '',
  ulica_broj: '',
  pib: '',
  maticni_broj: '',
  broj_dana: '',
  procenat_rabata: ''
};

const initialError = {
  error: false,
  message: ''
};

interface BeneficiariesProps {
  user: User;
}

const Beneficiaries: React.FC<BeneficiariesProps> = ({ user }) => {
  const [beneficiaries, setBeneficiaries] = useState<INarucioc[]>([]);
  const [loading, setLoading] = useState(true);

  const Refresh = async () => {
    setLoading(true);
    setBeneficiaries(await get_all_beneficiaries());
    setLoading(false);
  };

  useEffect(() => {
    Refresh();
  }, []);

  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: typeof initialValues) => {
    setMessage(initialError);
    try {
      await add_beneficiary(user._id, data);
      setMessage({
        error: false,
        message: 'Success!'
      });
    } catch (e) {
      setMessage({
        error: true,
        message: (JSON.parse(e) as { message: string }).message || (e as string)
      });
    }
  };

  const [autocompleteValue, setAutocompleteValue] = React.useState<
    (INarucioc & { key: number }) | null
  >(null);
  const [autocompleteInputValue, setAutocompleteInputValue] =
    React.useState('');

  const disabled = !!autocompleteValue;

  return (
    <Box p={4} width={'100%'}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          ime: Yup.string().required(),
          prezime: Yup.string().required(),
          telefon: Yup.string()
            .required()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(8, 'Not less than 8 digits')
            .max(9, 'Not more than 9 digits'),
          email: Yup.string().email().required(),
          naziv: Yup.string().required(),
          drzava: Yup.string().required(),
          grad: Yup.string().required(),
          postanski_broj: Yup.string().required(),
          ulica_broj: Yup.string().required(),
          pib: Yup.string()
            .required()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .matches(/^[1-9][0-9]+$/, "Can't start with 0")
            .min(9, '9 digits')
            .max(9, '9 digits'),
          maticni_broj: Yup.string().required(),
          broj_dana: Yup.number().required(),
          procenat_rabata: Yup.number().required()
        })}
      >
        {({ isSubmitting, setValues, values }) => (
          <Form>
            <Container maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Register Corporation</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    value={autocompleteValue}
                    onChange={(event, newValue) => {
                      setAutocompleteValue(newValue);

                      if (newValue) {
                        setValues(
                          {
                            ime: newValue.ime || '',
                            prezime: newValue.prezime || '',
                            telefon: newValue.telefon || '',
                            email: newValue.email || '',
                            naziv: newValue.naziv || '',
                            drzava: newValue.drzava || '',
                            grad: newValue.grad || '',
                            postanski_broj: newValue.postanski_broj || '',
                            ulica_broj: newValue.ulica_broj || '',
                            pib: newValue.pib || '',
                            maticni_broj: newValue.maticni_broj || '',
                            broj_dana: values.broj_dana,
                            procenat_rabata: values.procenat_rabata
                          },
                          true
                        );
                      }
                    }}
                    inputValue={autocompleteInputValue}
                    onInputChange={(event, newInputValue) => {
                      setAutocompleteInputValue(newInputValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value.key === option?.key
                    }
                    options={beneficiaries.map((x, i) => ({
                      key: i,
                      ...x
                    }))}
                    renderInput={(params) => (
                      <TextField {...params} label="Pretrazi PIB" />
                    )}
                    getOptionLabel={(option) => option.pib}
                    renderOption={(props, option) => (
                      <li {...props} key={option.key}>
                        <Typography>{option.naziv}</Typography>
                        <br />
                        <Typography color="textSecondary">
                          {option.pib}
                        </Typography>
                      </li>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="ime" label="Ime" disabled={disabled} />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="prezime"
                    label="Prezime"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="telefon"
                    label="Telefon"
                    startAdornment="+381"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="email"
                    label="Email"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="naziv"
                    label="Naziv"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="drzava"
                    label="Drzava"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="grad"
                    label="Grad"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="postanski_broj"
                    label="Postanski broj"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="ulica_broj"
                    label="Ulica i Broj"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="pib" label="PIB" disabled={disabled} />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="maticni_broj"
                    label="Maticni broj"
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="broj_dana"
                    label="Broj dana za placanje"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="procenat_rabata"
                    label="Procenat rabata"
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

export default Beneficiaries;
