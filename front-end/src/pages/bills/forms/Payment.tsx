import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import InputField from '../../../components/form-comps/InputField';
import SelectField from '../../../components/form-comps/SelectField';

const Payment: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<{ nacin: string }>();

  const nacin: string = values['nacin'];

  useEffect(() => {
    setFieldValue('vrednost', '');
    setFieldValue('broj_lk', '');
    setFieldValue('broj_slip_racuna', '');
    setFieldValue('ime', '');
    setFieldValue('prezime', '');
    setFieldValue('narucioc', '');
  }, [nacin]);
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
    </>
  );
};

export default Payment;
