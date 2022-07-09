import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { User } from '../../types/User';
import MaterialTable from '@material-table/core';
import { IArtikal } from '../../types/Article';
import { dodeliKategoriju } from '../../api/categories';
import { IKategorija } from '../../types/Category';

interface DodeliProps {
  user: User;
  onAfterSubmit: () => void;
  articles: IArtikal[];
  category: IKategorija;
}

const initialError = {
  error: false,
  message: ''
};

const Dodeli: React.FC<DodeliProps> = ({
  user,
  onAfterSubmit,
  articles,
  category
}) => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onSubmit = async (data: IArtikal) => {
    setMessage(initialError);
    try {
      await dodeliKategoriju(user._id, data._id, category.naziv);
      console.log(data);
      setMessage({
        error: false,
        message: 'Success!'
      });
      onAfterSubmit();
    } catch (e) {
      setMessage({
        error: true,
        message: (JSON.parse(e) as { message: string }).message || (e as string)
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box py={5}>
        {message && (
          <Typography color={message.error ? 'error' : 'green'}>
            {message.message}
          </Typography>
        )}
        <MaterialTable
          title={'Articles Table'}
          columns={[
            { title: 'Naziv', field: 'naziv' },
            {
              title: 'Kategorija',
              field: 'kategorija'
            }
          ]}
          data={articles}
          options={{
            actionsColumnIndex: -1
          }}
          actions={[
            {
              icon: () => (
                <Button variant="contained">
                  <Typography variant="button">Dodeli</Typography>
                </Button>
              ),
              onClick: (event, rowData) => {
                onSubmit(rowData as IArtikal);
              }
            }
          ]}
        />
      </Box>
    </Container>
  );
};

export default Dodeli;
