import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Calendar from "./components/Calendar";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="headerCalendar">
          <div id="logo">
            <span className="iconCalendar">date_range</span>
            <span>
              Kali <b>calendar</b> with React
            </span>
          </div>
        </header>
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
