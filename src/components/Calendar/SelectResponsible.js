import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { recordResponsible } from '../../actions/eventActions';


const listOfcontact = ['grey', 'jackson', 'jolivet'];

class SelectResponsible extends Component {
  constructor() {
    super();
    this.state = {
      responsible: '',
    };
    SelectResponsible.propTypes = {
      record: PropTypes.func.isRequired,
    };
  }

  handleChange = (event) => {
    const { record } = this.props;
    this.setState({ responsible: event.target.value });
    record(event.target.value);
  }

  render() {
    const { responsible } = this.state;
    return (
      <Select
        value={responsible}
        onChange={this.handleChange}
        name="responsible"
        // inputProps={{ id: 'responsible-required' }}
        // className={classes.selectEmpty}
      >
        {listOfcontact.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: responsible => dispatch(recordResponsible(responsible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectResponsible);
