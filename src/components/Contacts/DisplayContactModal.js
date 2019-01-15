import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

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
