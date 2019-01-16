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


const styles = theme => ({
  root: {
    maxWidth: 300,
    margin: 30,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  contactName: {
  },
});

const ContactCard = (props) => {
  const {
    classes,
    contact,
    handleSelectContact,
    handleDeleteContact,
    handleDisplayContact,
    index,
  } = props;
  // console.log('contact.phone', contact.phone);
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <div>
      <Card className={classes.root}>
        <a onClick={() => handleDisplayContact(index)}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" component="h3" className={classes.contactName}>
                {`${contact.title} ${contact.firstName} ${contact.lastName} ${contact.id}`}
              </Typography>
              <Typography component="h5">
                <p>{contact.category}</p>
                <p>{contact.phone === null ? '' : contact.phone === undefined ? '' : contact.phone}</p>
                <p>{contact.email !== null ? contact.email : ''}</p>
                <p>{contact.address === null ? '' : contact.address === undefined ? '' : contact.address}</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
        <IconButton color="secondary">
          <Icons name="NotificationsIcon" />
        </IconButton>
        <IconButton onClick={() => handleSelectContact(index)} color="secondary">
          <Icons name="EditIcon" />
        </IconButton>
        <IconButton onClick={() => handleDeleteContact(index)} color="secondary">
          <Icons name="DeleteForeverIcon" />
        </IconButton>
      </Card>
    </div>
  );
};

export default withStyles(styles)(ContactCard);
