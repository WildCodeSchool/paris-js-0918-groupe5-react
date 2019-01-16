import React from 'react';
import {
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import Icons from '../Icons';
import ContactCard from './ContactCard';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 300,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const ContactCards = (props) => {

  const {
    classes,
    contactsList,
    // ContactCardIsOpen,
    // handleClose,
    // displayedContact,
  } = props;

  return (
    <div>
      {/* {contactsList.map(contact => (
        <div>
          <ContactCard contact={contact} />
        </div>
      ))} */}
      {/* <Paper className={classes.root} elevation={1}>
        {contactsList.map((contact, index) => (
          <p key={contact.id}>
            <Button
              onClick={() => this.handleDisplayContact(index)}
              className={classes.displayContactButton}
            >
              {`${contact.title} ${contact.firstName} ${contact.lastName} ${contact.id}`}
              <br />
              {`${contact.category}`}
            </Button>
            <IconButton onClick={() => this.handleSelectContact(index)} color="secondary">
              <Icons name="EditIcon" />
            </IconButton>
            <IconButton onClick={() => this.handleDeleteContact(index)} color="secondary">
              <Icons name="DeleteForeverIcon" />
            </IconButton>
          </p>))}
        <Typography variant="h5" component="h3">
        This is a sheet of paper.
        </Typography>
        <Typography component="p">
        Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper> */}

      {/* <Dialog
        open={ContactCardIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {`${displayedContact.title} ${displayedContact.firstName} ${displayedContact.lastName}`}
        </DialogTitle>
        <DialogContent>
          {displayedContact.category !== null && (<h4>Catégorie</h4>)}
          <p>{displayedContact.category}</p>
          {displayedContact.email !== null && (<h4>Email</h4>)}
          <p>{displayedContact.email}</p>
          {displayedContact.phone !== null && (<h4>Téléphone</h4>)}
          <p>{displayedContact.phone}</p>
          {displayedContact.preferenceOfContact !== null && (<h4>Préférence de contact</h4>)}
          <p>{displayedContact.preferenceOfContact}</p>
          {displayedContact.comment !== null && (<h4>Comment</h4>)}
          <p>{displayedContact.comment}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default withStyles(styles)(ContactCards);
