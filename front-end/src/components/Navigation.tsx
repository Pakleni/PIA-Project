import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';

interface NavigationBarProps {
  Logout: () => void;
  user?: User;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ Logout, user }) => {
  const userPages: {
    label: string;
    link: string;
  }[] = [];
  const corpPages: {
    label: string;
    link: string;
  }[] = [];
  const adminPages: {
    label: string;
    link: string;
  }[] = [
    {
      label: 'Corporation Signup',
      link: '/corp/signup'
    },
    {
      label: 'User Signup',
      link: '/user/signup'
    },
    {
      label: 'Requests',
      link: '/requests'
    }
  ];
  const notLoggedPages: {
    label: string;
    link: string;
  }[] = [
    {
      label: 'Signup',
      link: '/corp/signup'
    }
  ];
  const pages = user
    ? user.type === 'Admin'
      ? adminPages
      : user.type === 'Buyer'
      ? userPages
      : corpPages
    : notLoggedPages;

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              to={'/'}
              component={Link}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              HOME
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.link}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link}
                  to={page.link}
                >
                  <Typography variant="button">{page.label}</Typography>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {user && (
                <Button
                  onClick={Logout}
                  variant="contained"
                  color="secondary"
                  sx={{ float: 'right' }}
                >
                  <Typography variant="button">Log out</Typography>
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavigationBar;
