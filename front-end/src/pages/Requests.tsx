import MaterialTable from '@material-table/core';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getRequests, RequestRespond } from '../api/request';
import { IRequest } from '../types/Request';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const columns = [
    { field: 'naziv', title: 'Company name' },
    { field: 'pib', title: 'PIB' },
    { field: 'email', title: 'Email' },
    { field: 'maticni_broj', title: 'Registration number' },
    { field: 'adresa', title: 'Address' },
    { field: 'username', title: 'Username' }
  ];

  const loadData = async () => {
    try {
      setRequests(await getRequests());
    } catch (e) {
      setError(e.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const Respond = async (_id: string, status: boolean) => {
    setLoading(true);
    try {
      await RequestRespond(_id, status);
      setRequests(await getRequests());
    } catch (e) {
      setRequests([]);
      setError(e.toString());
    }

    setLoading(false);
  };
  return (
    <Container maxWidth="xl">
      <MaterialTable
        title={'Requests'}
        columns={columns}
        data={requests}
        isLoading={loading}
        localization={{
          body: error
            ? {
                emptyDataSourceMessage: error
              }
            : {}
        }}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => <CheckIcon color="success" />,
            onClick: (event, rowData) => {
              Respond((rowData as IRequest)._id, true);
            }
          },
          {
            icon: () => <CloseIcon color="error" />,
            onClick: (event, rowData) => {
              Respond((rowData as IRequest)._id, false);
            }
          }
        ]}
      />
    </Container>
  );
};

export default Requests;
