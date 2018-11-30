import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Calendar from "./components/Calendar";
import RemainingComponent from "./components/RemainingComponent";


import "./App.css";

import { Route, BrowserRouter, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <RemainingComponent />
             <Switch>
                  <Route exact path="/" component={Dashboard} />
                  {/* <Route path='/contacts' component={Contacts} /> */}
                  <Route path="/calendrier" component={Calendar} />
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
