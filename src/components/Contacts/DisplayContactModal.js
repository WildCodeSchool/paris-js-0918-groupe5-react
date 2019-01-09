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
  const { classes } = props;
  const {
    /* eslint-disable react/prop-types */
    displayContactModalIsOpen,
    handleClose,
    selectedContact,
    // category,
    // handleCategory,
    // classes,
    // preferenceOfContact,
    // handlePreferenceOfContact,
  } = props;
    /* eslint-enable react/prop-types */

  return (
    <div>
      <Dialog
        open={displayContactModalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {`${selectedContact.title} ${selectedContact.firstName} ${selectedContact.lastName}`}
        </DialogTitle>
        <DialogContent>
          {selectedContact.category !== null && (<h4>Catégorie</h4>)}
          <p>{selectedContact.category}</p>
          {selectedContact.email !== null && (<h4>Email</h4>)}
          <p>{selectedContact.email}</p>
          {selectedContact.phone !== null && (<h4>Téléphone</h4>)}
          <p>{selectedContact.phone}</p>
          {selectedContact.preferenceOfContact !== null && (<h4>Préférence de contact</h4>)}
          <p>{selectedContact.preferenceOfContact}</p>
          {selectedContact.comment !== null && (<h4>Comment</h4>)}
          <p>{selectedContact.comment}</p>
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

// const mapStateToProps = state => ({
//   title: state.form.title,
//   firstName: state.form.firstName,
// });

export default withStyles(styles)(DisplayContactModal);
