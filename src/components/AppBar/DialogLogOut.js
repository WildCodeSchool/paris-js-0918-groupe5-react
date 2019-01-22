import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

const DialogLogOut = (props) => {
  const { dialogLogOutIsDisplayed, handleOpenCloseDialogLogOut, handleLogOut } = props;
  return (
    <div className="DialogLogOut">
      <Dialog
        open={dialogLogOutIsDisplayed}
        onClose={() => handleOpenCloseDialogLogOut(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Voulez-vous vraiment vous déconnecter ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleOpenCloseDialogLogOut(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleLogOut} color="primary" autoFocus>
            Se déconnecter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogLogOut;
