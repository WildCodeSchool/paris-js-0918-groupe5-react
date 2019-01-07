import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

// import RemainingComponent from './components/RemainingComponent';
import AppBarGlobal from './components/AppBarGlobal';
import ConnexionPage from './components/ConnexionPage';
import Calendar from './components/Calendar/Calendar';
import CaregiversForm from './components/Caregiver/CaregiverForm';
import Contact from './components/Contacts/Contact';

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

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <div>
        {/* <RemainingComponent /> */}
        <Route exact path="/connexion" component={ConnexionPage} />
        <div className="spaceBtwAppBarAndRoutes">
          {/* <AppBarGlobal /> */}
          <Route path="/tableau_de_bord" component={Dashboard} />
          <Route path="/contact" component={Contact} />
          <Route path="/création" component={CaregiversForm} />
          <Route path="/calendrier" component={Calendar} />
        </div>
        {/* <Route path='/suivi' component={FollowedUp} /> */}
        {/* <Route path='/mon_compte' component={Account} /> */}
      </div>
    </div>
  </MuiThemeProvider>
);


export default App;
