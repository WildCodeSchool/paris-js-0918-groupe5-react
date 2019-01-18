import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { displayAppBar } from '../actions/displayActions';
import SignUpCaregiver from './Caregiver/SignUpCaregiver';
import SignInCaregiver from './Caregiver/SignInCaregiver';
import logo from '../assets/logoKaliService3.png';

import './IntroductionPage.css';

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
    openSignUp: false,
    openSignIn: false,
  }

  handleClickOpenSignUp = () => {
    this.setState({ openSignUp: true });
  };

  handleCloseSignUp = () => {
    this.setState({ openSignUp: false });
  };

  handleClickOpenSignIn = () => {
    this.setState({ openSignIn: true });
  };

  handleCloseSignIn = () => {
    this.setState({ openSignIn: false });
  };

  render() {
    const { openSignUp, openSignIn } = this.state;
    const { classes } = this.props;
    return (
      <div className="ConnectionPage">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <img className="logoIntroAppBar" src={logo} alt="logo" />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Kalify
              </Typography>
              <Button onClick={this.handleClickOpenSignIn} color="inherit">Connexion</Button>
              <Button onClick={this.handleClickOpenSignUp} color="inherit">Inscription</Button>
            </Toolbar>
          </AppBar>
        </div>
        <SignUpCaregiver openSignUp={openSignUp} onCloseSignUp={this.handleCloseSignUp} />
        <SignInCaregiver openSignIn={openSignIn} onCloseSignIn={this.handleCloseSignIn} />
        <div className="logoIntro">
          <div className="introductionText">Bienvenue à la présentation de Kalify</div>
          <img className="imgLogoIntro" src={logo} alt="logo" />
          <div className="teamNames"> Elisa B. - Thomas C. - Adama L. - Elisa L. - Eleonore D. - Widaad B.</div>
        </div>
      </div>
    );
  }
}

IntroductionPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { displayAppBar })(withStyles(styles)(IntroductionPage));
