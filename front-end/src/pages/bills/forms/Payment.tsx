import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import InputField from '../../../components/form-comps/InputField';
import SelectField from '../../../components/form-comps/SelectField';
import { Bill, BillItem } from '../../../types/Bill';
import { price } from './Items';

const Payment: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<
    {
      selected_article: string;
      selected_mag: string;
    } & Bill &
      BillItem
  >();

  const nacin: string = values['nacin'] as string;

  useEffect(() => {
    setFieldValue('vrednost', '');
    setFieldValue('broj_lk', '');
    setFieldValue('broj_slip_racuna', '');
    setFieldValue('ime', '');
    setFieldValue('prezime', '');
    setFieldValue('narucioc', '');
  }, [nacin]);

  const cost = values.stavke.reduce((a, x) => a + price(x), 0);
  return (
    <>
      <Grid item xs={12}>
        <SelectField
          name="nacin"
          label="Nacin placanja"
          data={[
            {
              value: 'gotovina',
              label: 'gotovina'
            },
            {
              value: 'cek',
              label: 'cek'
            },
            {
              value: 'kartica',
              label: 'kartica'
            },
            {
              value: 'virman',
              label: 'virman'
            }
          ]}
        />
      </Grid>
      {nacin === 'gotovina' && (
        <Grid item xs={12}>
          <InputField name="vrednost" label="vrednost" />
        </Grid>
      )}
      {['gotovina', 'kartica', 'cek'].find((x) => x === nacin) && (
        <Grid item xs={12}>
          <InputField name="broj_lk" label="broj_lk" />
        </Grid>
      )}
      {nacin === 'kartica' && (
        <Grid item xs={12}>
          <InputField name="broj_slip_racuna" label="broj_slip_racuna" />
        </Grid>
      )}
      {nacin === 'cek' && (
        <>
          <Grid item xs={12}>
            <InputField name="ime" label="ime" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="prezime" label="prezime" />
          </Grid>
        </>
      )}
      {nacin === 'virman' && (
        <Grid item xs={12}>
          <InputField name="narucioc" label="narucioc" />
        </Grid>
      )}
      {nacin === 'gotovina' && values.vrednost && values.vrednost >= cost && (
        <Grid item xs={12}>
          Kusur : {(values.vrednost - cost).toLocaleString()} din
        </Grid>
      )}
    </>
  );
};

export default Payment;
