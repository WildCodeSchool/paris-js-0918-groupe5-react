import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { recordTitleAndAddress, recordAllInfo } from '../../actions/eventActions';
import SimpleSelect from './SimpleSelect';
import SimpleSelectAddress from './SimpleSelectAddress';
import SwitchLabels from './SwitchLabels';
import DateAndTimePickers from './DateAndTimePickers';

class DialogEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      adress: '',
    };
    DialogEvent.propTypes = {
      openOrNot: PropTypes.bool.isRequired,
      dDate: PropTypes.object.isRequired,
      allInfo: PropTypes.object.isRequired,
      recordTitleAndAddress: PropTypes.func.isRequired,
      recordAllInfo: PropTypes.func.isRequired,
      onOpen: PropTypes.func.isRequired,
    };
  }

  handleClose = () => {
    const { onOpen } = this.props;
    onOpen();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onBlur = () => {
    const { title, adress } = this.state;
    const { recordTitleAndAddress } = this.props;
    recordTitleAndAddress(title, adress);
  }

  onSubmit = () => {
    const { recordAllInfo, allInfo } = this.props;
    recordAllInfo(allInfo);
  }

  render() {
    const { openOrNot, dDate, allInfo } = this.props;
    const { title, adress } = this.state;
    return (
      <Dialog
        open={openOrNot}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nouvel événement</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Titre"
            type="text"
            fullWidth
            name="title"
            value={title}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="adress"
            label="Adresse"
            type="text"
            fullWidth
            name="adress"
            value={adress}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          <SimpleSelectAddress />
          <div>
            <br />
          </div>
          <DateAndTimePickers dDate={dDate} />
          <SimpleSelect />
          <SwitchLabels />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">Annuler</Button>
          {/* <Button onClick={this.onSubmit} color="primary">Enregistrer</Button> */}
          <Button onClick={() => this.onSubmit(allInfo)} color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  allInfo: state.event,
});

export default connect(
  mapStateToProps,
  {
    recordTitleAndAddress,
    recordAllInfo,
  },
)(DialogEvent);
