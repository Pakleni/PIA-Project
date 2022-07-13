import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import InputTextField from '../components/form-comps/InputTextField';
import { login } from '../api/user';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { User } from '../types/User';
import * as Yup from 'yup';
import { get_price } from '../utils/bills';
import { get5 } from '../api/bill';
import { Bill } from '../types/Bill';

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

  const [data, setData] = useState<(Bill & { amount: string })[]>([]);

  const onLoad = async () => {
    setData(
      (await get5()).map((x) => ({
        ...x,
        amount: get_price(x).toLocaleString()
      }))
    );
  };

  useEffect(() => {
    onLoad();
  }, []);

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
                  <Typography variant="h3" align="center">
                    Login
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputTextField name="username" label="Username" />
                </Grid>
                <Grid item xs={12}>
                  <InputTextField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    sx={{ ml: 'auto', mr: 'auto', display: 'block' }}
                  >
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
                {data.map((x, i) => (
                  <Grid item xs={12} key={i}>
                    <Card>
                      <CardContent>
                        <Typography
                          color="text.secondary"
                          gutterBottom
                          variant="h6"
                        >
                          {x.firma} [{x.amount} din]
                          {x.stavke.length && (
                            <>
                              <br />
                              Porez: {x.stavke[0].porez}
                            </>
                          )}
                        </Typography>
                        <Typography variant="body2">
                          {x.stavke.map((y) => (
                            <>
                              • {y.kolicina} x {y.naziv_artikla}
                              <br />
                            </>
                          ))}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FrontPage;
