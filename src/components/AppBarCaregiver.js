import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
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
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText inset primary="Mon compte" />
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <Alarm />
                </ListItemIcon>
                <ListItemText inset primary="Mes notifications" />
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <ListItemIcon>
                  <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText inset primary="Déconnexion" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBarCaregiver.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarCaregiver);
