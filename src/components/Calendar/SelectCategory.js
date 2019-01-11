import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// import { recordFrequency } from '../../actions/eventActions';

const listOfCategories = ['medical', 'nurse', 'family'];

class SelectCategory extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
    };
    SelectCategory.propTypes = {
      // record: PropTypes.func.isRequired,
    };
  }

  handleChange = (event) => {
    // const { record } = this.props;
    this.setState({ category: event.target.value });
    // record(event.target.value);
  }

  render() {
    const { category } = this.state;
    return (
      <Select
        value={category}
        onChange={this.handleChange}
        name="category"
        // inputProps={{ id: 'frequency-required' }}
        // className={classes.selectEmpty}
      >
        {listOfCategories.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
      </Select>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = () => ({
  // record: category => dispatch(recordCat(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);
