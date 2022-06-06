import React, { useEffect, useState } from 'react';
import {
  Route,
  RouteProps,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';
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
import CorpAddInfo from './pages/CorpAddInfo';
import ArticlesPage from './pages/articles';
import BillsPage from './pages/bills';

const theme = responsiveFontSizes(createTheme({}));

const App: React.FC = () => {
  const [user, setUser] = useState<User>();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    Login();
  }, []);

  const Login = async () => {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
      const { username, password } = JSON.parse(storageUser);

      try {
        const response = await login(username, password);
        setUser(response);
      } catch (e) {
        localStorage.removeItem('user');
        setUser(undefined);
      }
    }
  };

  const Logout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    history.push('/');
  };

  useEffect(() => {
    if (
      user?.type === 'Company' &&
      !user?.kategorija &&
      location.pathname != '/new-company'
    ) {
      history.push('/new-company');
    }
  }, [user, location]);

  const adminPages: RouteProps[] = [
    {
      exact: true,
      path: '/user/signup',
      component: UserSignup
    },
    {
      exact: true,
      path: '/corp/signup',
      component: CorpSignup
    },
    {
      exact: true,
      path: '/requests',
      component: Requests
    }
  ];

  const newCorpPages: RouteProps[] = [
    {
      exact: true,
      path: '/new-company',
      component: () => <CorpAddInfo user={user as User} Login={Login} />
    }
  ];

  const corpPages: RouteProps[] = [
    {
      exact: true,
      path: '/articles',
      component: () => <ArticlesPage user={user as User} />
    },
    {
      exact: true,
      path: '/new-bill',
      component: () => <BillsPage user={user as User} />
    }
  ];

  const buyerPages: RouteProps[] = [];

  const pages: RouteProps[] = [
    ...(user
      ? [
          {
            path: '/change-password',
            component: () => <ChangePassword user={user} Logout={Logout} />
          },
          ...(user.type === 'Admin'
            ? adminPages
            : user.type === 'Company'
            ? user.kategorija
              ? corpPages
              : newCorpPages
            : buyerPages)
        ]
      : [
          {
            exact: true,
            path: '/',
            component: () => <FrontPage setUser={setUser} />
          },
          { exact: true, path: '/corp/signup', component: CorpSignup }
        ]),
    { exact: true, path: '/admin/signup', component: AdminSignup },
    { component: Page404 }
  ];
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationBar Logout={Logout} user={user} />
        <Switch>
          {pages.map((x, i) => (
            <Route key={i} {...x} />
          ))}
        </Switch>
      </ThemeProvider>
    </>
  );
};

export default App;
