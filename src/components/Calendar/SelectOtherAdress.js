import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { recordAddress } from '../../actions/eventActions';

class SelectOtherAdress extends Component {
  constructor() {
    super();
    this.state = {
      preciseAddress: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { preciseAddress } = this.state;
    const { record, receiverAddressChecked } = this.props;
    return (
      <TextField
        disabled={receiverAddressChecked}
        required
        margin="dense"
        id="preciseAddress"
        label="Adresse"
        type="text"
        fullWidth
        name="preciseAddress"
        value={receiverAddressChecked ? 'receiver Address' : preciseAddress}
        onChange={this.handleChange}
        onBlur={() => record(preciseAddress)}
      />
    );
  }
}

SelectOtherAdress.propTypes = {
  record: PropTypes.func.isRequired,
  receiverAddressChecked: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  receiverAddressChecked: state.event.receiverAddressChecked,
});

const mapDispatchToProps = dispatch => ({
  record: preciseAddress => dispatch(recordAddress(preciseAddress)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectOtherAdress);
