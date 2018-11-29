import React from "react";

import logo from "../../assets/logo.svg";
import avatar_old_man from "../../assets/avatar_old_man.png";
import "./Header.css";

import Grid from "@material-ui/core/Grid";


const Header = () => {
  return (
    <header className="header">
      <Grid container spacing={0}>
      <Grid item xs={2}>
          <div></div>
        </Grid>
        <Grid item xs={8}>
          <img src={logo} className="header-logo" alt="logo" />
          <p className='nameLogo'>Kali Services</p>
        </Grid>
        <Grid item xs={2} className='user'>
          <img
            src={avatar_old_man}
            className="avatar_old_man"
            alt="avatar_old_man"
          />
          <p className='nameUser'>Maurice</p>
        </Grid>
      </Grid>
    </header>
  );
};
export default Header;
