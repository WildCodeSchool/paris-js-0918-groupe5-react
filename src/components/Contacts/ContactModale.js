import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import SimpleSelect from './SimpleSelect';
import RadioButton from './RadioButton';

const ContactModale = (props) => {
  const {
    modalIsOpen,
    handleClose,
    handleValidation,
    firstName,
    handleChangeFirstName,
    lastName,
    handleChangeLastName,
    category,
    handleCategory,
    preferenceOfContact,
    handlePreferenceOfContact,
  } = props;

  return (
    <div>
      <Dialog
        open={modalIsOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ajouter un contact professionnel
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titre"
            type="text"
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="FirstName"
            type="text"
            fullWidth
            value={firstName}
            onChange={handleChangeFirstName}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="LastName"
            type="text"
            fullWidth
            value={lastName}
            onChange={handleChangeLastName}
          />
          <SimpleSelect category={category} handleCategory={handleCategory} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Téléphone"
            type="text"
            fullWidth
          />
          <RadioButton
            preferenceOfContact={preferenceOfContact}
            handlePreferenceOfContact={handlePreferenceOfContact} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Commentaire"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleValidation} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ContactModale.propTypes = {
  handleValidation: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  handleChangeFirstName: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  handleChangeLastName: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  handleCategory: PropTypes.func.isRequired,
  preferenceOfContact: PropTypes.string.isRequired,
  handlePreferenceOfContact: PropTypes.func.isRequired,
};

export default ContactModale;
