import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { Company } from '../types/User';
import AddIcon from '@mui/icons-material/Add';
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Naziv" value={user.naziv} disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Osnivac Ime"
                value={user.ime}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Osnivac Prezime"
                value={user.prezime}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Telefon"
                value={user.telefon}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Drzava"
                value={user.drzava}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Grad" value={user.grad} disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Postanski Broj"
                value={user.postanski_broj}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Ulica"
                value={user.ulica_broj}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" value={user.email} disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Kategorija"
                value={user.kategorija}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Maticni broj"
                value={user.maticni_broj}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="PIB" value={user.pib} disabled />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="PDV"
                value={user.pdv ? 'Da' : 'Ne'}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Sifra Delatnosti"
                value={user.sifra_delatnosti.join(', ')}
                disabled
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {user.racuni.map((x, i) => (
            <Box key={i} p={1} m={1}>
              <TextField label="Broj" value={x.broj} disabled />
              <TextField label="Banka" value={x.banka} disabled />
            </Box>
          ))}
          <Box p={1} m={1}>
            <Button disabled variant="outlined">
              <AddIcon />
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {user.magacini.map((x, i) => (
            <Box key={i} p={1} m={1}>
              <TextField label="Id" value={x.id} disabled />
              <TextField label="Naziv" value={x.naziv} disabled />
            </Box>
          ))}
          <Box p={1} m={1}>
            <Button disabled variant="outlined">
              <AddIcon />
            </Button>
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ViewCorp;
