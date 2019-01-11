import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { recordDateAndTime } from '../../actions/eventActions';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
  },
  beginningDate: {
    marginRight: '1.7vw',
    width: 260,
  },
  endingDate: {
    width: 260,
  },
});

class DateAndTimePickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginningDate: moment(props.startingDate).toISOString(true).substr(0, 19),
      endingDate: moment(props.startingDate).toISOString(true).substr(0, 19),
    };
    DateAndTimePickers.propTypes = {
      startingDate: PropTypes.object.isRequired,
      record: PropTypes.func.isRequired,
      classes: PropTypes.object.isRequired,
    };
  }

  componentDidMount() {
    const { beginningDate, endingDate } = this.state;
    const { record } = this.props;
    record(beginningDate, endingDate);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, record } = this.props;
    const { beginningDate, endingDate } = this.state;
    const fieldInfos = [
      {
        fieldInfo: 'beginningDate',
        label: 'Date et heure de début',
        defaultValue: beginningDate,
      },
      {
        fieldInfo: 'endingDate',
        label: 'Date et heure de fin',
        defaultValue: endingDate,
      },
    ];
    return (
      <form className={classes.container} noValidate>
        {fieldInfos.map(item => (
          <TextField
            key={item.fieldInfo}
            required
            id={item.fieldInfo}
            label={item.label}
            type="datetime-local"
            defaultValue={item.defaultValue}
            className={classes[item.fieldInfo]}
            InputLabelProps={{ shrink: true }}
            name={item.fieldInfo}
            onChange={this.handleChange}
            onBlur={() => record(beginningDate, endingDate)}
          />))}
      </form>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: (begin, end) => dispatch(recordDateAndTime(begin, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DateAndTimePickers));
