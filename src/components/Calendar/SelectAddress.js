import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { recordAddress } from '../../actions/eventActions';

class SelectAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
    };
  }

  handleCheck = () => {
    const { record } = this.props;
    record(true, '');
    this.setState({ address: '' });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ address: value });
  }

  render() {
    const { OtherAddressChecked, record } = this.props;
    const { address } = this.state;
    return (
      <FormGroup className="adress">
        <FormControlLabel
          className="adressButton"
          control={(
            <Switch
              checked={OtherAddressChecked}
              disabled={OtherAddressChecked}
              onChange={this.handleCheck}
              value=""
            />)}
          label="Utiliser une autre adrresse que le domicile"
        />
        <TextField
          disabled={!OtherAddressChecked}
          required
          margin="dense"
          id="preciseAddress"
          label="Adresse"
          type="text"
          fullWidth
          name="otherAddressFiel"
          value={address}
          onChange={this.handleChange}
          onBlur={() => record(true, address)}
        />
      </FormGroup>
    );
  }
}

SelectAddress.propTypes = {
  record: PropTypes.func.isRequired,
  OtherAddressChecked: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  OtherAddressChecked: state.event.OtherAddressChecked,
  address: state.event.address,
});

const mapDispatchToProps = dispatch => ({
  record: (bool, address) => dispatch(recordAddress(bool, address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectAddress);