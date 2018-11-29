import React from "react";
import Icons from "./Icons";

import PropTypes from "prop-types";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import 'typeface-roboto';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    // border: "1px solid red",
    width: "600px",
    height: "1000px",
    backgroundColor: "#F2EFEA",
  },
  menuList: {
    // backgroundColor: "#F2EFEA"
  },
  itemNavBarCareGiver: {
    // border: '1px solid blue',
    marginTop: theme.spacing.unit * 4,
    fontSize: "19px",
    fontFamily: 'roboto',
  },
  itemNavBarCareGiverPopper: {
    fontSize: "19px",
  }
});

class NavBarCareGiver extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className="MenuLeft">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <MenuList className={classes.menuList}>
              <MenuItem
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                className={classes.itemNavBarCareGiver}
              >
                Mes aidés{" "}
              </MenuItem>
              

              <div>
                <Popper
                  open={open}
                  anchorEl={this.anchorEl}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      {/* Liste qui apprait */}
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            <MenuItem
                              onClick={this.handleClose}
                              className={classes.itemNavBarCareGiverPopper}
                            >
                              Maurice <Icons name="EditIcon" /> <Icons name="DeleteForeverIcon" />
                            </MenuItem>
                            <MenuItem
                              onClick={this.handleClose}
                              className={classes.itemNavBarCareGiverPopper}
                            >
                              Mauricette <Icons name="EditIcon" /> <Icons name="DeleteForeverIcon" />
                            </MenuItem>
                            <MenuItem
                              onClick={this.handleClose}
                              className={classes.itemNavBarCareGiverPopper}
                            >
                              Ajouter un aidé
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </MenuList>
          </Paper>
        </div>
      </div>
    );
  }
}

NavBarCareGiver.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBarCareGiver);
