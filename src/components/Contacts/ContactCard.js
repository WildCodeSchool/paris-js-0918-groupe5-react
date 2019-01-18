import React from 'react';
import {
  Typography,
  withStyles,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import Icons from '../Icons';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */

const styles = theme => ({
  root: {
    width: 300,
    height: 280,
    margin: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  contactName: {
  },
  contactIcons: {
    textAlign: 'right',
  },
});


const ContactCard = (props) => {
  const {
    classes,
    contact,
    handleSelectContact,
    handleDeleteContactModal,
    handleDisplayContact,
    index,
  } = props;

  return (
    <div>
      <Card className={classes.root}>
        <a onClick={() => handleDisplayContact(index)}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h3" className={classes.contactName}>
                {`${contact.title} ${contact.firstName} ${contact.lastName} ${index}`}
              </Typography>
              <Typography component="h5">
                <p>{contact.category}</p>
                <p>{contact.address === null ? '' : contact.address === undefined ? '' : contact.address}</p>
                <p>{contact.phone === null ? '' : contact.phone === undefined ? '' : contact.phone}</p>
                <p>{contact.email === null ? '' : contact.email === undefined ? '' : contact.email}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
        <div className={classes.contactIcons}>
          <IconButton color="secondary">
            <Icons name="NotificationsIcon" />
          </IconButton>
          <IconButton onClick={() => handleSelectContact(index)} color="secondary">
            <Icons name="EditIcon" />
          </IconButton>
          <IconButton onClick={() => handleDeleteContactModal(index)} color="secondary">
            <Icons name="DeleteForeverIcon" />
          </IconButton>
        </div>
      </Card>
    </div>
  );
};

export default withStyles(styles)(ContactCard);
