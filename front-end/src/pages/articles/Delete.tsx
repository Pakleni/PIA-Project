import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { User } from '../../types/User';
import { IArtikal } from '../../types/Article';
import { deleteArticle } from '../../api/articles';

interface DeleteArticlesProps {
  user: User;
  article: IArtikal;
  handleClose: () => void;
}

const initialError = {
  error: false,
  message: ''
};

const DeleteArticles: React.FC<DeleteArticlesProps> = ({
  user,
  article,
  handleClose
}) => {
  const [message, setMessage] = useState({
    error: false,
    message: ''
  });

  const onClick = async () => {
    setMessage(initialError);
    try {
      await deleteArticle(user._id, article._id);
      setMessage({
        error: false,
        message: 'Success!'
      });
      handleClose();
    } catch (e) {
      setMessage({
        error: true,
        message: e as string
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box py={5}>
        <Typography>
          Are you sure you want to delete {article.naziv}?
        </Typography>
        {message && (
          <Typography color={message.error ? 'error' : 'green'}>
            {message.message}
          </Typography>
        )}
        <Button color="secondary" variant="contained">
          <Typography variant="button" onClick={handleClose}>
            Cancel
          </Typography>
        </Button>
        <Button variant="contained">
          <Typography variant="button" onClick={onClick}>
            Delete
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default DeleteArticles;
