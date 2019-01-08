import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const DisplayContactModal = (props) => {
  const {
    displayContactModalIsOpen,
    handleClose,
    // category,
    // handleCategory,
    // classes,
    // preferenceOfContact,
    // handlePreferenceOfContact,
  } = props;

  return (
    <div>
      <Dialog
        open={displayContactModalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Mon contact
        </DialogTitle>
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

DisplayContactModal.propTypes = {
  classes: PropTypes.func.isRequired,
  handleValidation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  displayContactModalIsOpen: PropTypes.bool.isRequired,
};

export default DisplayContactModal;
