import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import Page404 from './pages/404';
import {
  Button,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material';
import { User } from './types/User';
import { login } from './api/user';

const theme = responsiveFontSizes(createTheme({}));

const App: React.FC = () => {
  const [user, setUser] = useState<User>();

  const loginOnLoad = async ({
    username,
    password
  }: {
    username: string;
    password: string;
  }) => {
    const response = await login(username, password);
    setUser(response);
  };

  useEffect(() => {
    const storageUser = localStorage.getItem('user');
    storageUser && loginOnLoad(JSON.parse(storageUser));
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Button
          onClick={() => {
            localStorage.removeItem('user');
            setUser(undefined);
          }}
        >
          Log Out
        </Button>
        <Switch>
          {/* so route needs to be fluid with user type */}
          {user ? (
            user.type === 'Admin' ? (
              <>{/* Admin routes */}</>
            ) : user.type === 'Buyer' ? (
              <>{/* Buyer routes */}</>
            ) : (
              <>{/* Corporation routes */}</>
            )
          ) : (
            <>
              <Route
                exact
                path="/"
                component={() => <FrontPage setUser={setUser} />}
              />
            </>
          )}
          <Route component={Page404} />
        </Switch>
      </ThemeProvider>
    </>
  );
};

export default App;
