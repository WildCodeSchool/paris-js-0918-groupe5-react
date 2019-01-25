import React from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import { displayDialogDeleteReceiver } from '../../actions/displayActions';

const DialogDeleteReceiver = (props) => {
  const {
    displayDialogDeleteReceiver,
    deleteReceiver,
    receiver,
    redux,
  } = props;
  return (
    <div className="DialogDeleteReceiver">
      <Dialog
        open={redux.dialogDeleteReceiverIsDisplayed}
        onClose={() => displayDialogDeleteReceiver(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Etes-vous sûr(e) de vouloir retirer ${receiver.firstName} de la liste des aidés ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => displayDialogDeleteReceiver(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={deleteReceiver(receiver.id)} color="primary" autoFocus>
            Retirer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  redux: {
    dialogDeleteReceiverIsDisplayed: state.display.dialogDeleteReceiverIsDisplayed,
  },
});

export default connect(mapStateToProps, { displayDialogDeleteReceiver })(DialogDeleteReceiver);
