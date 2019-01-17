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
import SignUpCaregiver from './Caregiver/SignUpCaregiver';
import SignInCaregiver from './Caregiver/SignInCaregiver';

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

class IntroductionPage extends Component {
  state = {
    // redirect: false,
    // inputConnection: false,
    openSignUp: false,
    openSignIn: false,
  }



  handleClickOpenSignUp = () => {
    this.setState({ openSignUp: true });
  };

  handleCloseLogin = () => {
    this.setState({ openSignUp: false });
  };

  handleClickOpenSignIn = () => {
    this.setState({ openSignIn: true });
  };

  handleCloseConnection = () => {
    this.setState({ openSignIn: false });
  };

  render() {
    const {
      redirect, inputConnection, openSignUp, openSignIn,
    } = this.state;
    const { classes } = this.props;
    // if (redirect) {
    //   return (
    //     <Redirect to="/tableau_de_bord" />
    //   );
    // }
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
              <Button onClick={this.handleClickOpenSignIn} color="inherit">Connexion</Button>
              <Button onClick={this.handleClickOpenSignUp} color="inherit">Inscription</Button>
            </Toolbar>
          </AppBar>
        </div>
        <SignUpCaregiver openSignUp={openSignUp} onCloseSignUp={this.handleCloseLogin} />
        <SignInCaregiver openSignIn={openSignIn} onCloseSignIn={this.handleCloseConnection} />
      </div>
    );
  }
}

IntroductionPage.propTypes = {
  // displayAppBar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { displayAppBar })(withStyles(styles)(IntroductionPage));
