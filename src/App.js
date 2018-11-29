import React from 'react';
import Calendar from './components/Calendar';
import {Route, BrowserRouter} from 'react-router-dom';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        {/* <Route exact path='/' component={DashBoard} /> */}
        {/* <Route path='/contacts' component={Contacts} /> */}
        <Route path='/calendrier' component={Calendar}/>
        {/* <Route path='/suivi' component={FollowedUp} /> */}
        {/* <Route path='/mon_compte' component={Account} /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
