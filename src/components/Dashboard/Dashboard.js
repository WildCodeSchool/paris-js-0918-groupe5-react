import React, { Component } from "react";
import Header from "./Header";
import NavBarTop from "./NavBarTop";
import NavBarLeft from "./NavBarLeft";
import CarlendarLittle from "./CalendarLittle";
import Curves from "./Curves";

import "./NavBarLeft.css";
import "./CalendarLittle.css";
import "./Curves.css";

import Grid from "@material-ui/core/Grid";

class App extends Component {
  render() { 
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header />
          </Grid>

          <Grid item xs={12}>
            <NavBarTop />
          </Grid>

          <Grid item xs={2}>
            <NavBarLeft />
          </Grid>

          <Grid item xs={10}>
            <CarlendarLittle />
            <Curves />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default App;
