import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { recordAddress } from '../../actions/eventActions';

class SelectReceiverAddress extends React.Component {
  state = {
    receiverAddressChecked: false,
    preciseAddress: 'receiver Address',
  };

  handleCheck = (event) => {
    const { receiverAddressChecked } = this.state;
    this.setState({
      receiverAddressChecked: event.target.checked,
      preciseAddress: receiverAddressChecked ? 'receiver Address' : event.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({ preciseAddress: event.target.value });
  };

  render() {
    const { receiverAddressChecked, preciseAddress } = this.state;
    const { record } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={(
            <Switch
              checked={receiverAddressChecked}
              disabled={receiverAddressChecked}
              onChange={this.handleCheck}
              // onClick={() => record(receiverAddressChecked, preciseAddress)}
              value=""
            />)}
          label="Utiliser une autre adrresse que le domicile"
        />
        <TextField
          disabled={!receiverAddressChecked}
          required
          margin="dense"
          id="preciseAddress"
          label="Adresse"
          type="text"
          fullWidth
          name="otherAddressFiel"
          value={preciseAddress}
          onChange={this.handleChange}
          onBlur={() => record(receiverAddressChecked, preciseAddress)}
        />
      </FormGroup>
    );
  }
}

SelectReceiverAddress.propTypes = {
  record: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: (bool, adress) => dispatch(recordAddress(bool, adress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectReceiverAddress);
