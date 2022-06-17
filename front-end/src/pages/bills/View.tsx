import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { Bill } from '../../types/Bill';
import { get_price } from '../../utils/bills';

interface ViewBillsProps {
  bill: Bill;
}

const ViewBills: React.FC<ViewBillsProps> = ({ bill }) => {
  return (
    <Container maxWidth="md">
      <Box py={5}>
        <Typography variant="h4">Informacije</Typography>
        <Typography>Datum: {new Date(bill.datum).toTimeString()}</Typography>
        <Typography>Magacin/Objekat: {bill.magacin_naziv}</Typography>
        <Typography>Nacin: {bill.nacin}</Typography>
        <Typography>Licna Karta: {bill.broj_lk}</Typography>
        {bill.broj_slip_racuna && (
          <Typography>Broj slip racuna: {bill.broj_slip_racuna}</Typography>
        )}
        {bill.ime && <Typography>Ime: {bill.ime}</Typography>}
        {bill.prezime && <Typography>Prezime: {bill.prezime}</Typography>}
        <Typography>Iznoss: {get_price(bill).toLocaleString()} din</Typography>

        {bill.stavke.map((x, i) => (
          <Box key={i} p={1} m={1} border="1px solid">
            <Typography>{x.naziv_artikla}</Typography>
            <Typography>{x.kolicina}</Typography>
            <Typography>{x.porez}</Typography>
            <Typography>{x.prodajna_cena} din</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ViewBills;
