import React, { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
import { Container, Dialog } from '@mui/material';
import { Bill } from '../../types/Bill';
import { get_bills_id } from '../../api/bill';
import { User } from '../../types/User';
import { get_price } from '../../utils/bills';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewBills from './View';

interface UserBillsPageProps {
  user: User;
}
const UserBillsPage: React.FC<UserBillsPageProps> = ({ user }) => {
  const [data, setData] = useState<Bill[]>([]);

  const [loading, setLoading] = useState(true);
  const [dialogData, SetDialogData] = useState<Bill>();
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        actions={[
          {
            icon: () => <VisibilityIcon />,
            onClick: (event, rowData) => {
              SetDialogData(rowData as Bill);
              handleOpen();
            }
          }
        ]}
        data={data}
        isLoading={loading}
      />
      <Dialog open={open} onClose={handleClose}>
        {dialogData && <ViewBills bill={dialogData} />}
      </Dialog>
    </Container>
  );
};

export default UserBillsPage;
