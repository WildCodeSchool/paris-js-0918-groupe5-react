import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

import RemainingComponent from './components/RemainingComponent';
import Calendar from './components/Calendar/Calendar';
import Contact from './components/Contacts/Contact';

import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <RemainingComponent />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/contact" component={Contact} />
          <Route path="/contacts" component={Contact} />
          <Route path="/calendrier" component={Calendar} />
          {/* <Route path='/suivi' component={FollowedUp} /> */}
          {/* <Route path='/mon_compte' component={Account} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);


export default App;
