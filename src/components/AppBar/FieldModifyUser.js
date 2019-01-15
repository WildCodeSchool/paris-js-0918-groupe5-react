import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MyAccountModale extends React.Component {
  render() {
    const {
      openField, onClose, onCloseAll, selectedField,
    } = this.props;
    return (
      <div>
        <Dialog
          open={openField}
					onClose={this.handleCloseFieldModifyAccount}
					onCloseAll={onCloseAll}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{selectedField}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vous trouverez ci-dessous vos informations personnelles.
              <br />
              Si vous souhaitez les modifier, nous vous invitons à cliquer sur le bouton "Modifier".
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={selectedField}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Fermer
            </Button>
						<Button onClick={onCloseAll} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MyAccountModale;
