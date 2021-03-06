import MaterialTable from '@material-table/core';
import { Container, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { get_bills } from '../api/bill';
import { get_corps } from '../api/user';
import { Bill } from '../types/Bill';
import { CompanyDataExternal } from '../types/User';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { get_price } from '../utils/bills';

const AdminReports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, SetData] = useState<CompanyDataExternal[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);

  const Refresh = async () => {
    setLoading(true);
    SetData(await get_corps());
    setBills(await get_bills());
    setLoading(false);
  };

  useEffect(() => {
    Refresh();
  }, []);

  const [datumOd, setDatumOd] = React.useState<Date | null>(null);
  const [datumDo, setDatumDo] = React.useState<Date | null>(null);

  const [naziv, setNaziv] = React.useState('');
  const [pib, setPib] = React.useState('');

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Izvestaji</Typography>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              maxDate={datumDo || new Date()}
              label="Od"
              value={datumOd}
              onChange={(newValue) => {
                setDatumOd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              minDate={datumOd}
              maxDate={new Date()}
              label="Do"
              value={datumDo}
              onChange={(newValue) => {
                setDatumDo(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            label="naziv"
            value={naziv}
            onChange={(event) => setNaziv(event.target.value)}
          />
          <TextField
            label="pib"
            value={pib}
            onChange={(event) => setPib(event.target.value)}
          />
        </Grid>
      </Grid>
      {datumOd && datumDo && (
        <MaterialTable
          title={'Reports Table'}
          columns={[
            {
              title: 'GRB',
              render: (rowData) => (
                <img width="50" height="50" src={rowData.grb} />
              )
            },
            { title: 'Naziv', field: 'naziv' },
            { title: 'PIB', field: 'pib' },
            { title: 'Iznos', field: 'iznos' },
            { title: 'PDV', field: 'pdv' }
          ]}
          data={data
            .filter(
              (x) => (!naziv || naziv === x.naziv) && (!pib || pib === x.pib)
            )
            .map((x) => {
              const mybills = bills.filter(
                (y) =>
                  y.firma === x._id &&
                  y.datum >= datumOd.getTime() &&
                  y.datum < datumDo.getTime() + 24 * 60 * 60 * 1000
              );

              const iznos = mybills.reduce((a, b) => a + get_price(b), 0);

              const porez = parseInt(mybills[0]?.stavke[0]?.porez) || 0;

              const pdv = (iznos / (1 + porez / 100)) * (porez / 100);

              return {
                ...x,
                iznos: iznos.toLocaleString(),
                pdv: pdv.toLocaleString()
              };
            })}
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
export default AdminReports;
