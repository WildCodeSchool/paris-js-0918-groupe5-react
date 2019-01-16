import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  withStyles,
} from '@material-ui/core';
// import classes from '*.module.sass';

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
  cancelDelete: {
    color: 'grey',
  },
});

const DeleteContactModal = (props) => {
  const {
    deleteContactModalIsOpen,
    handleClose,
    displayedContact,
    classes,
    handleDeleteContact,
    selectedId,
  } = props;
  return (
    <div>
      <Dialog
        open={deleteContactModalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.displayModal}>
          <DialogTitle id="form-dialog-title">
            Confirmation
          </DialogTitle>
          <DialogContent>
            {`Voulez-vous vraiment supprimer la fiche contact de ${displayedContact.firstName} ${displayedContact.lastName} ?`}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDeleteContact(selectedId)} color="primary">
              Supprimer
            </Button>
            <Button onClick={handleClose} className={classes.cancelDelete}>
              Non
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(DeleteContactModal);
