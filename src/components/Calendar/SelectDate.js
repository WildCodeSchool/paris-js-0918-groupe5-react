import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { recordDateAndTime } from '../../actions/eventActions';

class SelectDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingDate: props.startingDate,
      endingDate: props.startingDate,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { record } = this.props;
    const { startingDate, endingDate } = this.state;

    const fieldInfos = [
      {
        fieldInfo: 'startingDate',
        label: 'Date et heure de début',
        defaultValue: startingDate,
      },
      {
        fieldInfo: 'endingDate',
        label: 'Date et heure de fin',
        defaultValue: endingDate,
      },
    ];

    return (
      <form className="dateSelection">
        {fieldInfos.map(item => (
          <TextField
            key={item.fieldInfo}
            required
            label={item.label}
            type="datetime-local"
            defaultValue={item.defaultValue}
            InputLabelProps={{ shrink: true }}
            name={item.fieldInfo}
            onChange={this.handleChange}
            onBlur={() => record(startingDate, endingDate)}
          />))}
      </form>
    );
  }
}

SelectDate.propTypes = {
  record: PropTypes.func.isRequired,
  startingDate: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  startingDate: state.event.startingDate,
  endingDate: state.event.endingDate,
});

const mapDispatchToProps = dispatch => ({
  record: (start, end) => dispatch(recordDateAndTime(start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);
