import React from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#F2EFEA',
    // color: "white",
    padding: 0,
    height:'40px',
    // border: "3px solid purple"
  },
  navBarCareGiverToolbar: {
    // border: '3px solid blue',
    padding: '0px',
    minHeight: 0,
  },
  navBarCareGiverItem: {
    // border: '3px solid green',
    fontSize: '20px',
    marginTop: '2px',
  },
};

const NavBarReceiver1 = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.appBarGrid}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar className={classes.navBarCareGiverToolbar}>
            <Grid item xs={2}>
              <NavLink exact to="/">
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.navBarCareGiverItem}
                >
                  Mes aidés
                </Typography>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink exact to="/">
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.navBarCareGiverItem}
                >
                  Gérer mes notifications
                </Typography>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink exact to="/">
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.navBarCareGiverItem}
                >
                  Mes contacts d'urgence
                </Typography>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink exact to="/">
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.navBarCareGiverItem}
                >
                  Mon compte
                </Typography>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink exact to="/">
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.navBarCareGiverItem}
                >
                  Déconnexion
                </Typography>
              </NavLink>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

NavBarReceiver1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBarReceiver1);
