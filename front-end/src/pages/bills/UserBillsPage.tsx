import React, { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
import { Container } from '@mui/material';
import { Bill } from '../../types/Bill';
import { get_bills_id } from '../../api/bill';
import { User } from '../../types/User';
import { get_price } from '../../utils/bills';

interface UserBillsPageProps {
  user: User;
}
const UserBillsPage: React.FC<UserBillsPageProps> = ({ user }) => {
  const [data, setData] = useState<Bill[]>([]);

  const [loading, setLoading] = useState(true);

  const onLoad = async () => {
    setData(
      (await get_bills_id(user.broj_lk)).map((x) => ({
        ...x,
        amount: get_price(x).toLocaleString()
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Container>
      <MaterialTable
        columns={[
          {
            title: 'Preduzece',
            field: 'firma'
          },
          {
            title: 'Objekat',
            field: 'magacin_naziv'
          },
          {
            title: 'Iznos',
            field: 'amount'
          },
          {
            title: 'Nacin placanja',
            field: 'nacin'
          }
        ]}
        data={data}
        isLoading={loading}
      />
    </Container>
  );
};

export default UserBillsPage;
