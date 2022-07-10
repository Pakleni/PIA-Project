import MaterialTable from '@material-table/core';
import { Container, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { get_corp_bills } from '../api/bill';
import { Bill } from '../types/Bill';
import { User } from '../types/User';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { get_price } from '../utils/bills';

interface CorporationReports {
  user: User;
}

const CorporationReports: React.FC<CorporationReports> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);

  const Refresh = async () => {
    setLoading(true);
    setBills(await get_corp_bills(user._id));
    setLoading(false);
  };

  useEffect(() => {
    Refresh();
  }, []);

  const [datumOd, setDatumOd] = React.useState<Date | null>(null);

  const porez = parseInt(bills[0]?.stavke[0]?.porez) || 0;

  const filtered_bills = datumOd
    ? bills
        .filter(
          (x) =>
            x.datum >= datumOd.getTime() &&
            x.datum < datumOd.getTime() + 24 * 60 * 60 * 1000
        )
        .map((x) => {
          const iznos = get_price(x);
          const pdv = (iznos / (1 + porez / 100)) * (porez / 100);

          return {
            ...x,
            iznos: iznos.toLocaleString(),
            pdv: pdv.toLocaleString()
          };
        })
    : [];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Izvestaji</Typography>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              maxDate={new Date()}
              label="Od"
              value={datumOd}
              onChange={(newValue) => {
                newValue && setDatumOd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">
            TOTAL:{' '}
            {filtered_bills
              .reduce((a, b) => a + get_price(b), 0)
              .toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      {datumOd && (
        <MaterialTable
          title={'Reports Table'}
          columns={[
            { title: 'Nacin placanja', field: 'nacin' },
            { title: 'Iznos', field: 'iznos' },
            { title: 'PDV', field: 'pdv' }
          ]}
          data={filtered_bills}
          isLoading={loading}
          options={{
            search: false,
            actionsColumnIndex: -1
          }}
        />
      )}
    </Container>
  );
};
export default CorporationReports;
