import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import { logOut } from '../../actions/infoActions';

class DialogLogOut extends Component {
  state={
    redirect: false,
  }

  handleLogOut = () => {
    const { logOut } = this.props;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    logOut();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const {
      handleOpenCloseDialogLogOut,
    } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/" />
      );
    }
    return (

      <div className="DialogLogOut">
        <Dialog
          open
          onClose={handleOpenCloseDialogLogOut(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Voulez-vous vraiment vous déconnecter ?</DialogTitle>
          <DialogActions>
            <Button onClick={handleOpenCloseDialogLogOut(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleLogOut} color="primary" autoFocus>
              Se déconnecter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { logOut })(DialogLogOut);
