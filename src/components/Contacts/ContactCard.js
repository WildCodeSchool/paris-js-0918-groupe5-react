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


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 300,
    margin: 30,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const ContactCard = (props) => {

  const {
    classes,
    contact,
    handleSelectContact,
    index,
    // ContactCardIsOpen,
    // handleClose,
    // displayedContact,
  } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h3">
          {`${contact.title} ${contact.firstName} ${contact.lastName} ${contact.id}`}
        </Typography>
        <Typography component="p">
          {`${contact.category}
          ${contact.phone !== null ? contact.phone : ''}
          ${contact.email !== null ? contact.email : ''}`}
        </Typography>
        <IconButton onClick={() => handleSelectContact(index)}>
          <Icons name="EditIcon" />
        </IconButton>
        <IconButton>
          <Icons name="DeleteForeverIcon" />
        </IconButton>
      </Paper>

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

export default withStyles(styles)(ContactCard);
