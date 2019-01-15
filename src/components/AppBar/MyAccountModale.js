import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icons from '../Icons';
import FieldModifyUser from './FieldModifyUser';

class MyAccountModale extends React.Component {
  state = {
    openFieldModifyAccount: false,
  }

  openFieldModifyAccount = () => {
    this.setState({ openFieldModifyAccount: true });
  }

  handleCloseFieldModifyAccount = () => {
    this.setState({ openFieldModifyAccount: false });
  };

  recordNewInformations = () => {
    this.setState({ openFieldModifyAccount: false });
    this.props.onClose();
  }

  render() {
    const { open, onClose } = this.props;
    const { openFieldModifyAccount } = this.state;
    console.log(openFieldModifyAccount);
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleCloseModale}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Mon compte</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vous trouverez ci-dessous vos informations personnelles.
              <br />
              Si vous souhaitez les modifier, nous vous invitons à cliquer sur le bouton "Modifier".
            </DialogContentText>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            /> */}
            <h4>Nom</h4>
            <p>
              Jolivet Karine
              <IconButton onClick={this.openFieldModifyAccount}>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Adresse</h4>
            <p>
              11 rue de poissy Paris
              <IconButton>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Téléphone</h4>
            <p>
              0606060606
              <IconButton>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Email</h4>
            <p>
              karine@jolivet.com
              <IconButton>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Mot de passe</h4>
            <p>
              *****
              <IconButton>
                <Icons name="EditIcon" />
              </IconButton>
            </p>
            <h4>Nombre d'abonnements</h4>
            <p>2</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
        <FieldModifyUser openField={openFieldModifyAccount} onClose={this.handleCloseFieldModifyAccount} closeAll={this.recordNewInformations} />
      </div>
    );
  }
}

export default MyAccountModale;
