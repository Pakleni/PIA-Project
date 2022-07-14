import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { get_beneficiaries } from '../../../api/beneficiaries';
import InputTextField from '../../../components/form-comps/InputTextField';
import SelectField from '../../../components/form-comps/SelectField';
import { INarucioc } from '../../../types/Beneficiary';
import { Bill, BillItem } from '../../../types/Bill';
import { User } from '../../../types/User';
import { get_price } from '../../../utils/bills';

const Payment: React.FC<{ user: User }> = ({ user }) => {
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

  const [beneficiaries, setBeneficiaries] = useState<INarucioc[]>([]);
  const [loading, setLoading] = useState(true);

  const Refresh = async () => {
    setLoading(true);
    setBeneficiaries(await get_beneficiaries(user._id));
    setLoading(false);
  };

  useEffect(() => {
    Refresh();
  }, []);

  const cost = get_price(values);
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
          <InputTextField name="vrednost" label="vrednost" />
        </Grid>
      )}
      {['gotovina', 'kartica', 'cek'].find((x) => x === nacin) && (
        <Grid item xs={12}>
          <InputTextField name="broj_lk" label="broj_lk" />
        </Grid>
      )}
      {nacin === 'kartica' && (
        <Grid item xs={12}>
          <InputTextField name="broj_slip_racuna" label="broj_slip_racuna" />
        </Grid>
      )}
      {nacin === 'cek' && (
        <>
          <Grid item xs={12}>
            <InputTextField name="ime" label="ime" />
          </Grid>
          <Grid item xs={12}>
            <InputTextField name="prezime" label="prezime" />
          </Grid>
        </>
      )}
      {nacin === 'virman' && (
        <Grid item xs={12}>
          <SelectField
            name="narucioc"
            label="narucioc"
            data={beneficiaries.map((x) => ({
              value: x.pib,
              label: x.naziv + ' - ' + x.pib
            }))}
          />
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
