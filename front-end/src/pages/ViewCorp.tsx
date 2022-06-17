import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Company } from '../types/User';

interface ViewCorpProps {
  user: Company;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const ViewCorp: React.FC<ViewCorpProps> = ({ user }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box py={5}>
        <Typography variant="h4">Informacije</Typography>
        <img src={user.grb} />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Opsti Podaci" {...a11yProps(0)} />
            <Tab label="Ziro Racuni" {...a11yProps(1)} />
            <Tab label="Magacini" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography>{user.naziv}</Typography>
          <Typography>
            Osnivac: {user.ime} {user.prezime}
          </Typography>
          <Typography>+381 {user.telefon}</Typography>
          <Typography>Drzava: {user.drzava}</Typography>
          <Typography>Grad: {user.grad}</Typography>
          <Typography>Postanski Broj: {user.postanski_broj}</Typography>
          <Typography>Ulica: {user.ulica_broj}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Kategorija: {user.kategorija}</Typography>
          <Typography>Maticni broj: {user.maticni_broj}</Typography>
          <Typography>PIB: {user.pib}</Typography>
          <Typography>PDV: {user.pdv ? 'Da' : 'Ne'}</Typography>
          <Typography>
            Sifra Delatnosti: {user.sifra_delatnosti.join(', ')}
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {user.racuni.map((x, i) => (
            <Box key={i} p={1} m={1} border="1px solid">
              <Typography>Broj: {x.broj}</Typography>
              <Typography>Banka: {x.banka}</Typography>
            </Box>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {user.magacini.map((x, i) => (
            <Box key={i} p={1} m={1} border="1px solid">
              <Typography>Id: {x.id}</Typography>
              <Typography>Naziv: {x.naziv}</Typography>
            </Box>
          ))}
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ViewCorp;
