import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { recordFrequency } from '../../actions/eventActions';

// import SelectMultipleDays from './SelectMultipleDays';

const listOfFrequency = ['once', 'everyday', 'everydayWeek'];


class SelectFrequency extends Component {
  constructor() {
    super();
    this.state = {
      frequency: '',
    };
    SelectFrequency.propTypes = {
      record: PropTypes.func.isRequired,
    };
  }

  handleChange = (event) => {
    const { record } = this.props;
    this.setState({ frequency: event.target.value });
    record(event.target.value);
    console.log(event.target.value);
  }

  render() {
    const { frequency } = this.state;
    return (
      <Select
        value={frequency}
        onChange={this.handleChange}
        name="frequency"
        // inputProps={{
        //   id: 'frequency-required',
        // }}
        // className={classes.selectEmpty}
      >
        {listOfFrequency.map(item => <MenuItem value={item}>{item}</MenuItem>)}
      </Select>
      // <SelectMultipleDays />
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  record: frequency => dispatch(recordFrequency(frequency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFrequency);

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// // import Checkbox from '@material-ui/core/Checkbox';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { connect } from 'react-redux';
// import { recordSimpleSelect } from '../../actions/eventActions';
// import SelectMultipleDays from './SelectMultipleDays';
// import SelectResponsible from './SelectResponsible';
// import SelectCategory from './SelectCategory';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     marginRight: theme.spacing.unit,
//     marginTop: theme.spacing.unit,
//     width: 300,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2,
//   },
// });

// class SelectFrequency extends React.Component {
//   state = {
//     frequency: '',
//     responsible: '',
//     category: '',
//   };

//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   onBlur = () => {
//     const { frequency, responsible, category } = this.state;
//     const { recordSimpleSelect } = this.props;
//     recordSimpleSelect(frequency, responsible, category);
//   }

//   render() {
//     const { classes } = this.props;
//     const { frequency, responsible, category } = this.state;
//     return (
//       <div>
//         <form
//           className={classes.root}
//           autoComplete="off"
//           onBlur={() => this.onBlur()}
//         >
//           <FormControl required className={classes.formControl}>
//             <InputLabel htmlFor="frequency-required">Fréquence</InputLabel>
//             <Select
//               value={frequency}
//               onChange={this.handleChange}
//               name="frequency"
//               // inputProps={{
//               //   id: 'frequency-required',
//               // }}
//               className={classes.selectEmpty}
//             >
//               <MenuItem value="once">Une seule fois</MenuItem>
//               <MenuItem value="everyday">Tous les jours</MenuItem>
//               <MenuItem value="everydayWeek">Sélectionner certains jours de la semaine</MenuItem>
//               <SelectMultipleDays />
//             </Select>
//             <FormHelperText>
//               {'Indiquer ici la récurrence de l\'événement'}
//             </FormHelperText>
//           </FormControl>
//         </form>
//       </div>
//     );
//   }
// }

// SelectFrequency.propTypes = {
//   classes: PropTypes.object.isRequired,
//   recordSimpleSelect: PropTypes.func.isRequired,
// };


// const mapStateToProps = state => state;

// export default connect(mapStateToProps,
//   { recordSimpleSelect })(withStyles(styles)(SelectFrequency));
