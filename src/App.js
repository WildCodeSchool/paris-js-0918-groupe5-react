import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import AppBarGlobal from './components/AppBar/AppBarGlobal';
import IntroductionPage from './components/IntroductionPage';
import Calendar from './components/Calendar/Calendar';
import SignUpCaregiver from './components/Caregiver/SignUpCaregiver';
import Contact from './components/Contacts/Contact';
import Monitoring from './components/Monitoring/Monitoring';
import SignInCaregiver from './components/Caregiver/SignInCaregiver';
import ResetPassword from './components/Caregiver/ResetPassword';

import './App.css';
import 'typeface-roboto';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#65CDE2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FC8F72',
      contrastText: '#fff',
    },
  },
  props: {
    // Name of the component ⚛️
    MuiAppBar: {
      // The properties to apply
      elevation: 0, // No more ripple, on the whole application 💣!
    },
  },
  overrides: {
    MuiAppBar: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        padding: 0, // Some CSS
      },
    },
  },
});

const App = (props) => {
  const { location } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <div>
          <Route exact path="/" component={IntroductionPage} />
          {location.pathname !== '/'
            && location.pathname !== '/connexion'
            && location.pathname !== '/inscription'
            && location.pathname !== '/reset/:token'
            && <AppBarGlobal />}
          <div className="spaceBtwAppBarAndRoutes">
            <Route exact path="/connexion" component={SignInCaregiver} />
            <Route exact path="/tableau_de_bord" component={Dashboard} />
            <Route exact path="/contacts" component={Contact} />
            <Route exact path="/création" component={SignUpCaregiver} />
            <Route exact path="/calendrier" component={Calendar} />
            <Route exact path="/suivi" component={Monitoring} />
            <Route path="/reset/:token" component={ResetPassword} />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
