import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { responsiveFontSizes, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Home from '../home/Home';
import Page404 from './404';

const theme = responsiveFontSizes(createMuiTheme({}));

const App: React.FC = (): ReactElement => {
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
