import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

import RemainingComponent from './components/RemainingComponent';
import Calendar from './components/Calendar/Calendar';
import Contacts from './components/Contacts/Contacts';
import CaregiversForm from './components/Caregiver/CaregiverForm';

import './App.css';


class App extends React.Component {

  state = {
    TG_esLint: [],
  };


  render() {
    this.state.TG_esLint = [];
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <RemainingComponent />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/calendrier" component={Calendar} />
              <Route path="/création" component={CaregiversForm} />
              {/* <Route path='/suivi' component={FollowedUp} /> */}
              {/* <Route path='/mon_compte' component={Account} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
