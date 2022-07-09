import MaterialTable from '@material-table/core';
import { Button, Container, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getArticles } from '../../api/articles';
import { getCategories } from '../../api/categories';
import { IArtikal } from '../../types/Article';
import { IKategorija } from '../../types/Category';
import { User } from '../../types/User';
import AddCategory from './AddCategory';
import Dodeli from './Dodeli';

interface CategoriesPageProps {
  user: User;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, SetData] = useState<IKategorija[]>([]);

  const [dialog, SetDialog] = useState('');
  const [dialogData, SetDialogData] = useState<IKategorija>();
  const [articles, SetArticles] = useState<IArtikal[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Refresh = async () => {
    setLoading(true);
    SetArticles(await getArticles(user._id));
    SetData(await getCategories(user._id));

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
        columns={[{ title: 'Naziv', field: 'naziv' }]}
        data={data}
        isLoading={loading}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => (
              <Button variant="contained">
                <Typography variant="button">DODAJ</Typography>
              </Button>
            ),
            onClick: () => {
              SetDialog('create');
              handleOpen();
            },
            isFreeAction: true
          },
          {
            icon: () => (
              <Button variant="contained">
                <Typography variant="button">Dodeli</Typography>
              </Button>
            ),
            onClick: (event, rowData) => {
              SetDialogData(rowData as IKategorija);
              SetDialog('assign');
              handleOpen();
            }
          }
        ]}
      />
      <Dialog open={open} onClose={handleClose}>
        {dialog === 'create' ? (
          <AddCategory
            user={user}
            onClose={() => {
              handleClose();
              Refresh();
            }}
          />
        ) : (
          dialogData && (
            <Dodeli
              user={user}
              onAfterSubmit={() => {
                Refresh();
              }}
              articles={articles}
              category={dialogData}
            />
          )
        )}
      </Dialog>
    </Container>
  );
};
export default CategoriesPage;
