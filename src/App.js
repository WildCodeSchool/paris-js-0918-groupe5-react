import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
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

const App = ({ redux }) => (
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <div>
        {/* <RemainingComponent /> */}
        <Route exact path="/" component={IntroductionPage} />
        {redux.appBarIsDisplayed && <AppBarGlobal />}
        <div className="spaceBtwAppBarAndRoutes">
          <Route path="/connexion" component={SignInCaregiver} />
          <Route path="/tableau_de_bord" component={Dashboard} />
          {/* <Route path="/contacts" component={Contact} /> */}
          <Route path="/contacts" component={Contact} />
          <Route path="/création" component={SignUpCaregiver} />
          <Route path="/calendrier" component={Calendar} />
          <Route path="/suivi" component={Monitoring} />
          <Route path="/reset" component={ResetPassword} />
        </div>
        {/* <Route path='/mon_compte' component={Account} /> */}
      </div>
    </div>
  </MuiThemeProvider>
);

const mapStateToProps = state => ({
  redux: {
    appBarIsDisplayed: state.display.appBarIsDisplayed,
  },
});

export default connect(mapStateToProps, null)(App);
