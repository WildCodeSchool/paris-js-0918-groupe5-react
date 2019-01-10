import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import logo from '../assets/logo.svg';
import avatarOldMan from '../assets/avatar_old_man.png';
import avatarOldWoman from '../assets/avatar_old_woman.png';
import getServerAuthority from '../config/getServerAuthority';

import './Header.css';

// eslint-disable-next-line no-undef
const token = localStorage.getItem('token');

class Header extends Component {
  state = {
    receiversList : [],
  }

  componentDidMount() {
    axios.get({
      method: 'GET',
      url: `${getServerAuthority()}/users/receivers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => this.setState({ receiversList: res.data }));
  }

  render() {
    const { receiversList } = this.state;
    return (
      <header className="header">
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <img src={logo} className="header-logo" alt="logo" />
            <p className="nameLogo">Kalify</p>
          </Grid>
          <Grid item xs={3}>
            <div />
          </Grid>
          <Grid item xs={1} className="user1">
            {receiversList.map(receiver => (
              <div>
                <img
                  src={receiver.avatar}
                  className="avatar_old_man"
                  alt={receiver.firstName}
                />
                <p className="nameUser">
                  {`${receiver.firstName} ${receiver.lastName}`}
                </p>
              </div>
            ))
            }

            {/* <img
              src={avatarOldWoman}
              className="avatar_old_man"
              alt="avatar_old_man"
            />
            <p className='nameUser'>Mauricette</p> */}
          </Grid>
          {/* <Grid item xs={1} className='user2'>
            <img
              src={avatarOldMan}
              className="avatar_old_man"
              alt="avatar_old_man"
            />
            <p className='nameUser'>Maurice</p>
          </Grid> */}
          <Grid item xs={2}>
            <div />
          </Grid>
        </Grid>
      </header>
    );
  }
};
export default Header;
