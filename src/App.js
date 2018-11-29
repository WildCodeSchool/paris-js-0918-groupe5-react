import React from "react";
import Calendar from "./components/Calendar";

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
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;