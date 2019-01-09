import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import SelectOtherAdress from './SelectOtherAdress';


import { receiverAddressChecked, recordAddress } from '../../actions/eventActions';

class SelectReceiverAddress extends React.Component {
  state = {
    receiverAddressChecked: false,
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
    // const { clearAddressFiel } = this.props;
    // if (receiverAddressChecked) clearAddressFiel();
  };

  render() {
    const { receiverAddressChecked } = this.state;
    const { record } = this.props;
    return (
      <div>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Switch
                checked={receiverAddressChecked}
                onChange={this.handleChange('receiverAddressChecked')}
                onClick={() => record(receiverAddressChecked)}
                value="receiverAddressChecked"
              />)}
            label="Utiliser une autre adrresse que le domicile"
          />
        </FormGroup>
        <SelectOtherAdress />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

SelectReceiverAddress.propTypes = {
  record: PropTypes.func.isRequired,
  clearAddressFiel: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: bool => dispatch(receiverAddressChecked(bool)),
  clearAddressFiel: () => dispatch(recordAddress('')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectReceiverAddress);
