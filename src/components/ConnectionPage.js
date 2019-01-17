import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import getServerAuthority from '../config/getServerAuthority';
import { displayAppBar } from '../actions/displayActions';
import CaregiverForm from './Caregiver/CaregiverForm';
import ConnectionPagee from './ConnectionPagee';

import './ConnectionPage.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ConnectionPage extends Component {
  state = {
    redirect: false,
    inputConnection: false,
    openLogin: false,
    openConnection: false,
  }

  componentDidMount() {
    const { displayAppBar } = this.props;
    displayAppBar(false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${getServerAuthority()}/auth/signin`, {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      const { displayAppBar } = this.props;
      localStorage.setItem('token', res.headers['x-access-token']);
      localStorage.setItem('id', res.id);
      // console.log('token', localStorage.getItem('token'));
      this.setState({ redirect: true }, displayAppBar(true));
    });
  }

  // inputConnection = () => {
  //   this.setState({ inputConnection: true });
  // };

  handleClickOpenLogin = () => {
    this.setState({ openLogin: true });
  };

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  };

  handleClickOpenConnection = () => {
    this.setState({ openConnection: true });
  };

  handleCloseConnection = () => {
    this.setState({ openConnection: false });
  };

  render() {
    const { redirect, inputConnection, openLogin, openConnection } = this.state;
    const { classes } = this.props;
    if (redirect) {
      return (
        <Redirect to="/tableau_de_bord" />
      );
    }
    return (
      <div className="ConnectionPage">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Kalify
              </Typography>
              <Button onClick={this.handleClickOpenConnection} color="inherit">Connexion</Button>
              <Button onClick={this.handleClickOpenLogin} color="inherit">Inscription</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className={!inputConnection ? 'invisibleInputConnection' : 'visibleInputConnection'}>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">
              Mail:
              <input id="email" type="email" name="email" />
            </label>
            <label htmlFor="password">
              Mot de passe:
              <input type="password" name="password" />
            </label>
            <button type="submit">Valider</button>
          </form>
        </div>
        <CaregiverForm openLogin={openLogin} onCloseLogin={this.handleCloseLogin} />
        <ConnectionPagee openConnection={openConnection} onCloseConnection={this.handleCloseConnection} />

      </div>
    );
  }
}

ConnectionPage.propTypes = {
  displayAppBar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { displayAppBar })(withStyles(styles)(ConnectionPage));
