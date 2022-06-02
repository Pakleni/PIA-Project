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
import AdminSignup from './pages/AdminSignup';
import ChangePassword from './pages/ChangePassword';
import UserSignup from './pages/UserSignup';
import CorpSignup from './pages/CorpSignup';

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
    try {
      const response = await login(username, password);
      setUser(response);
    } catch (e) {
      localStorage.removeItem('user');
      setUser(undefined);
    }
  };

  useEffect(() => {
    const storageUser = localStorage.getItem('user');
    storageUser && loginOnLoad(JSON.parse(storageUser));
  }, []);

  const Logout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Button onClick={Logout}>Log Out</Button>
        <Switch>
          <Route exact path="/admin/signup" component={AdminSignup} />
          {/* so route needs to be fluid with user type */}
          {user ? (
            <>
              <Route
                exact
                path="/change-password"
                component={() => <ChangePassword user={user} Logout={Logout} />}
              />
              {user.type === 'Admin' ? (
                <>
                  {/* Admin routes */}
                  <Route exact path="/user/signup" component={UserSignup} />
                  <Route exact path="/corp/signup" component={CorpSignup} />
                </>
              ) : user.type === 'Buyer' ? (
                <>{/* Buyer routes */}</>
              ) : (
                <>{/* Corporation routes */}</>
              )}
            </>
          ) : (
            <>
              <Route
                exact
                path="/"
                component={() => <FrontPage setUser={setUser} />}
              />
              <Route exact path="/corp/signup" component={CorpSignup} />
            </>
          )}

          <Route component={Page404} />
        </Switch>
      </ThemeProvider>
    </>
  );
};

export default App;
