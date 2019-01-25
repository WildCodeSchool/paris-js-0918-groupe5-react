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
  displayModal: {
    width: 400,
    align: 'center',
  },
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
    classes,
  } = props;

  return (
    <div>
      <Dialog
        open={displayContactModalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.displayModal}>
          <DialogTitle id="form-dialog-title">
            {`${displayedContact.title} ${displayedContact.lastName} ${displayedContact.firstName}`}
          </DialogTitle>
          <DialogContent>
            {displayedContact.category !== null && (<h4>Catégorie</h4>)}
            <p>{displayedContact.category}</p>

            {displayedContact.profession !== null
              && (displayedContact.profession !== undefined && <h4>Fonction</h4>)}
            <p>{displayedContact.profession}</p>

            {displayedContact.address !== null && (<h4>Adresse</h4>)}
            <p>{displayedContact.address}</p>

            {displayedContact.preferenceOfContact !== null && (<h4>Préférence de contact</h4>)}
            <p>{displayedContact.preferenceOfContact}</p>

            {displayedContact.email !== null && (<h4>Email</h4>)}
            <p>{displayedContact.email}</p>

            {displayedContact.phone !== null
              && (displayedContact.phone !== undefined && <h4>Téléphone</h4>)}
            <p>{displayedContact.phone}</p>
            {displayedContact.comment !== null
              && (displayedContact.comment !== undefined && <h4>Commentaire</h4>)}
            <p>{displayedContact.comment}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(DisplayContactModal);
