import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MyAccountModale extends React.Component {

  recording = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      openField, onClose, onCloseAll, selectedField, stateName,
    } = this.props;
    return (
      <div>
        <Dialog
          open={openField}
          onClose={this.handleCloseFieldModifyAccount}
          onCloseAll={onCloseAll}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
          Modification de votre {selectedField}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez taper ici vos nouvelles coordonnées:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name={stateName}
              label={selectedField}
              type="email"
              fullWidth
              onChange={this.recording}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Fermer
            </Button>
            <Button onClick={() => onCloseAll(stateName, this.state)} color="primary">
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MyAccountModale;
