import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface NavigationBarProps {
  Logout: () => void;
  user?: User;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ Logout, user }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const userPages: {
    label: string;
    link: string;
  }[] = [
    {
      label: 'Change Password',
      link: '/change-password'
    }
  ];
  const corpPages: {
    label: string;
    link: string;
  }[] = [
    {
      label: 'Add Article',
      link: '/articles/create'
    },
    {
      label: 'Change Password',
      link: '/change-password'
    }
  ];
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
    },
    {
      label: 'Change Password',
      link: '/change-password'
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
                  sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}
                  component={Link}
                  to={page.link}
                  variant="text"
                >
                  <Typography variant="button">{page.label}</Typography>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Link} to={'/'}>
                    Home
                  </Typography>
                </MenuItem>
                {pages.map((page) => (
                  <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={page.link}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
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
