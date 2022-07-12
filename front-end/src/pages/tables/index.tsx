import { Button, Container, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getArticles } from '../../api/articles';
import { getCategories } from '../../api/categories';
import { IArtikal } from '../../types/Article';
import { IKategorija } from '../../types/Category';
import { User } from '../../types/User';
import AddCategory from './AddCategory';

interface CategoriesPageProps {
  user: User;
  Login: () => Promise<void>;
}

const TablesPage: React.FC<CategoriesPageProps> = ({ user, Login }) => {
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

  const onClick = () => {
    SetDialog('create');
    handleOpen();
  };

  return (
    <Container>
      <Typography variant="h1">Stolovi</Typography>
      <Button onClick={onClick}>Klikni ME</Button>
      <Dialog open={open} onClose={handleClose}>
        <AddCategory
          user={user}
          onClose={() => {
            handleClose();
            Refresh();
            Login();
          }}
        />
      </Dialog>
    </Container>
  );
};
export default TablesPage;
