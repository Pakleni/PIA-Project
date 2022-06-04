import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import Page404 from './pages/404';
import {
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
import NavigationBar from './components/Navigation';
import Requests from './pages/Requests';

const theme = responsiveFontSizes(createTheme({}));

const App: React.FC = () => {
  const [user, setUser] = useState<User>();
  const history = useHistory();

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
    history.push('/');
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationBar Logout={Logout} user={user} />
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
                  <Route exact path="/requests" component={Requests} />
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
