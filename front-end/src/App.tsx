import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Page404 from './pages/404';
import {
  Box,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider
} from '@mui/material';

const theme = responsiveFontSizes(createTheme({}));

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box m={2}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Page404} />
          </Switch>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
