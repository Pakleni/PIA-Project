import {
  Box,
  Button,
  Container,
  Dialog,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { get_predracun } from '../../api/predracun';
import { IPredracun } from '../../types/PreBill';
import { User } from '../../types/User';
import AddOdeljak from './AddOdeljak';
import StoRacun from './StoRacun';

interface TablesPageProps {
  user: User;
  Login: () => Promise<void>;
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

export interface ISto {
  id: string;
  okrugao: boolean;
  vis: string;
  sir: string;
  x: string;
  y: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const TablesPage: React.FC<TablesPageProps> = ({ user, Login }) => {
  const [open, setOpen] = useState(false);

  const data = user.odeljenja || [];

  const [dialog, SetDialog] = useState('');
  const [dialogData, SetDialogData] = useState<ISto>();

  const [prebills, SetPreBills] = useState<IPredracun[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Refresh = async () => {
    SetPreBills(await get_predracun(user._id));
  };

  useEffect(() => {
    Refresh();
  }, []);

  const onClick = () => {
    SetDialog('create');
    handleOpen();
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Typography variant="h1">Stolovi</Typography>
      <Button onClick={onClick} variant="outlined">
        Dodaj Odeljenje
      </Button>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map((x, i) => {
            return <Tab key={i} label={x.naziv} {...a11yProps(i)} />;
          })}
        </Tabs>
      </Box>
      {data.map((x, i) => {
        return (
          <TabPanel value={value} index={i} key={i}>
            <div
              style={{
                width: '1000px',
                height: '700px',
                backgroundColor: 'gray',
                position: 'relative'
              }}
            >
              {x.stolovi.map((y, j) => {
                const zauzet = !!prebills.find((z) => z.sto === y.id);

                return (
                  <div
                    key={j}
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: y.okrugao ? '50%' : undefined,
                      top: `${y.y}px`,
                      left: `${y.x}px`,
                      width: `${y.sir}px`,
                      height: `${y.vis}px`,
                      flexDirection: 'column'
                    }}
                  >
                    <Typography>{y.id}</Typography>
                    <Button
                      variant="outlined"
                      color={zauzet ? 'error' : 'success'}
                      onClick={() => {
                        SetDialogData(y);
                        setOpen(true);
                        SetDialog(zauzet ? 'dodaj' : 'otvori');
                      }}
                    >
                      {zauzet ? 'Dodaj na racun' : 'Otvori racun'}
                    </Button>
                    {zauzet && (
                      <Button
                        variant="outlined"
                        color={zauzet ? 'error' : 'success'}
                        onClick={() => {
                          SetDialogData(y);
                          setOpen(true);
                          SetDialog('zatvori');
                        }}
                      >
                        {'Zatvori Racun'}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </TabPanel>
        );
      })}
      <Dialog open={open} onClose={handleClose}>
        {dialog === 'create' ? (
          <AddOdeljak
            user={user}
            onClose={() => {
              handleClose();
              Refresh();
              Login();
            }}
          />
        ) : dialog === 'zatvori' ? (
          <AddOdeljak
            user={user}
            onClose={() => {
              handleClose();
              Refresh();
              Login();
            }}
          />
        ) : (
          dialogData && (
            <StoRacun
              user={user}
              sto={dialogData}
              prebills={prebills}
              onClose={() => {
                handleClose();
                Refresh();
              }}
            />
          )
        )}
      </Dialog>
    </Container>
  );
};
export default TablesPage;
