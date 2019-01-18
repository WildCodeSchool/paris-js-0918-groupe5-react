import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { recordTitle } from '../../actions/eventActions';

class SelectTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ title: value });
  }

  render() {
    const { record } = this.props;
    const { title } = this.state;
    return (
      <TextField
        required
        autoFocus
        margin="dense"
        label="Nom de l'événement"
        type="text"
        fullWidth
        name="title"
        value={title}
        onChange={this.handleChange}
        onBlur={() => record(title)}
      />
    );
  }
}

SelectTitle.propTypes = {
  record: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  record: title => dispatch(recordTitle(title)),
});

export default connect(null, mapDispatchToProps)(SelectTitle);