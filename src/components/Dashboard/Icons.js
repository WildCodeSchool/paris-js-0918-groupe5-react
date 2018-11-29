import React from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PeopleIcon from "@material-ui/icons/People";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PhoneInTalk from "@material-ui/icons/PhoneInTalk";
import PersonIcon from "@material-ui/icons/Person";
import Input from "@material-ui/icons/Input";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  icon: {
    // margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    fontSize: 20
  }
});

function Icons({ classes, name }) {
  switch (name) {
    case "EditIcon":
      return <EditIcon className={classes.icon} />;
    case "DeleteForeverIcon":
      return <DeleteForeverIcon className={classes.icon} />;
    case "PeopleIcon":
      return <PeopleIcon className={classes.icon} />;
    case "NotificationsIcon":
      return <NotificationsIcon className={classes.icon} />;
    case "PhoneInTalk":
      return <PhoneInTalk className={classes.icon} />;
    case "PersonIcon":
      return <PersonIcon className={classes.icon} />;
    case "Input":
      return <Input className={classes.icon} />;

    default:
      return "";
  }
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Icons);
