import React from 'react';
import Calendar from './components/Calendar';
import {Route, BrowserRouter} from 'react-router-dom';

import './App.css';

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
        {/* <Route exact path='/' component={DashBoard} /> */}
        {/* <Route path='/contacts' component={Contacts} /> */}
        <Route path='/calendrier' component={Calendar}/>
        {/* <Route path='/suivi' component={FollowedUp} /> */}
        </BrowserRouter>
       
      </div>
    );
  }
}

export default App;
