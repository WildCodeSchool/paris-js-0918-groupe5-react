import React from "react";

import logo from "../../assets/logo.svg";
import avatar_old_man from "../../assets/avatar_old_man.png";
import avatar_old_woman from "../../assets/avatar_old_woman.png";
import "./Header.css";

import Grid from "@material-ui/core/Grid";


const Header = () => {
  return (
    <header className="header">
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <img src={logo} className="header-logo" alt="logo" />
          <p className='nameLogo'>Kali Services</p>
        </Grid>
        <Grid item xs={3}>
          <div></div>
        </Grid>
        <Grid item xs={1} className='user1'>
          <img
            src={avatar_old_woman}
            className="avatar_old_man"
            alt="avatar_old_man"
          />
          <p className='nameUser'>Mauricette</p>
        </Grid>
        <Grid item xs={1} className='user2'>
          <img
            src={avatar_old_man}
            className="avatar_old_man"
            alt="avatar_old_man"
          />
          <p className='nameUser'>Maurice</p>
        </Grid>
        <Grid item xs={2}>
          <div></div>
        </Grid>
      </Grid>
    </header>
  );
};
export default Header;
