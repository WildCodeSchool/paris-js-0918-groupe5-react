import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  AccountCircle,
  Alarm,
  Build,
  PowerSettingsNew,
} from '@material-ui/icons';
import MyAccountModal from './MyAccountModal';
import DialogLogOut from './DialogLogOut';
import { logOut } from '../../actions/infoActions';


const styles = {
  toolbarRoot: {
    justifyContent: 'flex-end',
  },
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

class AppBarCaregiver extends Component {
  state = {
    anchorEl: null,
    openModalAccount: false,
    dialogLogOutIsDisplayed: false,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickOpenModal = () => {
    this.setState({ openModalAccount: true, anchorEl: null });
  };

  handleCloseModal = () => {
    this.setState({ openModalAccount: false });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleOpenDialogLogOut = () => {
    this.setState({
      dialogLogOutIsDisplayed: true,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      anchorEl,
      openModalAccount,
      dialogLogOutIsDisplayed,
    } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="AppBarCaregiver">
        <AppBar position="static">
          <Toolbar disableGutters classes={{ root: classes.toolbarRoot }}>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Build fontSize="small" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleCloseMenu}
            >
              <MenuItem onClick={this.handleClickOpenModal}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText inset primary="Mon compte" />
              </MenuItem>
              <MenuItem onClick={this.handleCloseMenu}>
                <ListItemIcon>
                  <Alarm />
                </ListItemIcon>
                <ListItemText inset primary="Mes notifications" />
              </MenuItem>
              <MenuItem onClick={this.handleOpenDialogLogOut}>
                <ListItemIcon>
                  <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText inset primary="Déconnexion" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <MyAccountModal open={openModalAccount} onClose={this.handleCloseModal} />
        {dialogLogOutIsDisplayed && (
          <DialogLogOut
            handleOpenCloseDialogLogOut={this.handleOpenCloseDialogLogOut}
          />
        )}
      </div>
    );
  }
}

AppBarCaregiver.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { logOut })(withStyles(styles)(AppBarCaregiver));
