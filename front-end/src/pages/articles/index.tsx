import MaterialTable from '@material-table/core';
import { Button, Container, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getArticles } from '../../api/articles';
import { IArtikal } from '../../types/Article';
import { User } from '../../types/User';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CreateArticles from './Create';
import EditArticles from './Edit';
import DeleteArticles from './Delete';
import ViewArticles from './View';
import VisibilityIcon from '@mui/icons-material/Visibility';
interface ArticlesPageProps {
  user: User;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dialog, SetDialog] = useState('');
  const [dialogData, SetDialogData] = useState<IArtikal>();

  const [data, SetData] = useState<IArtikal[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    Refresh();
  };

  const Refresh = async () => {
    setLoading(true);
    SetData(await getArticles(user._id));
    setLoading(false);
  };

  useEffect(() => {
    Refresh();
  }, []);

  return (
    <Container>
      <Typography variant="h1">Articles</Typography>
      <MaterialTable
        title={'Articles Table'}
        columns={[
          {
            title: 'Slika',
            render: (rowData) => (
              <img width="50" height="50" src={rowData.slicica} />
            )
          },
          { title: 'Sifra', field: 'sifra' },
          { title: 'Naziv', field: 'naziv' },
          { title: 'Jedinica Mere', field: 'jedinica' },
          { title: 'Stopa Poreza', field: 'stopa' },
          { title: 'Proizvodjac', field: 'proizvodjac' }
        ]}
        data={data}
        isLoading={loading}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => (
              <Button variant="contained">
                <Typography variant="button">CREATE</Typography>
              </Button>
            ),
            onClick: () => {
              SetDialog('create');
              handleOpen();
            },
            isFreeAction: true
          },
          {
            icon: () => <EditIcon />,
            onClick: (event, rowData) => {
              SetDialog('edit');
              SetDialogData(rowData as IArtikal);
              handleOpen();
            }
          },
          {
            icon: () => <VisibilityIcon />,
            onClick: (event, rowData) => {
              SetDialog('view');
              SetDialogData(rowData as IArtikal);
              handleOpen();
            }
          },
          {
            icon: () => <CloseIcon color="error" />,
            onClick: (event, rowData) => {
              SetDialog('delete');
              SetDialogData(rowData as IArtikal);
              handleOpen();
            }
          }
        ]}
      />
      <Dialog open={open} onClose={handleClose}>
        {dialog === 'create' ? (
          <CreateArticles user={user} />
        ) : dialog === 'view' ? (
          dialogData && <ViewArticles article={dialogData} />
        ) : dialog === 'edit' ? (
          dialogData && <EditArticles user={user} article={dialogData} />
        ) : (
          dialogData && (
            <DeleteArticles
              user={user}
              article={dialogData}
              handleClose={handleClose}
            />
          )
        )}
      </Dialog>
    </Container>
  );
};
export default ArticlesPage;
