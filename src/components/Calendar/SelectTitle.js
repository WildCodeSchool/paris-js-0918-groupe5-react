import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import { recordTitle } from '../../actions/eventActions';

class SelectTitle extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };
    SelectTitle.propTypes = {
      record: PropTypes.func.isRequired,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { title } = this.state;
    const { record } = this.props;
    return (
      <TextField
        required
        autoFocus
        margin="dense"
        id="title"
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

const mapStateToProps = state => ({
  title: state.event.title,
});

// const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: title => dispatch(recordTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTitle);
