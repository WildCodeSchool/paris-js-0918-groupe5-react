import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { recordDateAndTime } from '../../actions/eventActions';


const getGoodFormat = date => moment(date).toISOString(true).substr(0, 19);

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
  },
  startingDate: {
    marginRight: '1.7vw',
    width: 260,
  },
  endingDate: {
    width: 260,
  },
});

class SelectDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // startingDate: moment(props.startingDate).toISOString(true).substr(0, 19),
      // endingDate: moment(props.startingDate).toISOString(true).substr(0, 19),
      // startingDate: props.startingDate,
      // endingDate: props.startingDate,
    };
  }

  // componentDidMount() {
  //   const { startingDate, endingDate } = this.props;
  //   console.log('didMoount', startingDate, endingDate);
  //   const { record } = this.props;
  //   record(startingDate, endingDate);
  // }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, record } = this.props;
    // const { startingDate, endingDate } = this.state;
    const { startingDate, endingDate } = this.props;
    console.log('render', startingDate);

    const fieldInfos = [
      {
        fieldInfo: 'startingDate',
        label: 'Date et heure de début',
        // defaultValue: getGoodFormat(startingDate),
        defaultValue: startingDate,
        // defaultValue: '2019-01-16T00:00:00',
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
            onBlur={() => record(startingDate, endingDate)}
          />))}
      </form>
    );
  }
}

SelectDate.propTypes = {
  // startingDate: PropTypes.object.isRequired,
  record: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  startingDate: state.event.startingDate,
  endingDate: state.event.endingDate,
});

const mapDispatchToProps = dispatch => ({
  record: (begin, end) => dispatch(recordDateAndTime(begin, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectDate));
