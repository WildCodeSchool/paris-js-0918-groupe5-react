import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const DisplayContactModal = (props) => {
  const {
    displayContactModalIsOpen,
    handleClose,
    displayedContact,
  } = props;

  return (
    <div>
      <Dialog
        open={displayContactModalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {`${displayedContact.title} ${displayedContact.firstName} ${displayedContact.lastName}`}
        </DialogTitle>
        <DialogContent>
          {displayedContact.category !== null && (<h4>Catégorie</h4>)}
          <p>{displayedContact.category}</p>
          {displayedContact.profession !== null && (<h4>Fonction</h4>)}
          <p>{displayedContact.profession}</p>
          {displayedContact.address !== null && (<h4>Adresse</h4>)}
          <p>{displayedContact.address}</p>
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
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(DisplayContactModal);
