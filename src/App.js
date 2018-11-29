import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Calendar from "./components/Calendar";
import { Route, BrowserRouter, Switch, NavLink } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            {/* <Route path='/contacts' component={Contacts} /> */}
            <Route path="/calendrier" component={Calendar} />
            {/* <Route path='/suivi' component={FollowedUp} /> */}
            {/* <Route path='/mon_compte' component={Account} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
