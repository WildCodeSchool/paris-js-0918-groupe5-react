import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recordSimpleSelect } from '../../actions/eventActions';
import SwitchLabel from './SwitchLabels';


class SimpleSelectValues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyST: props.frequency,
      responsibleST: '',
      categoryST: '',
    };
  }


  componentDidReceiveProps() {
    const {
      recordSimpleSelect,
      frequency,
      responsible,
      category,
    } = this.props;
    recordSimpleSelect(frequency, responsible, category);
  }

  render() {
    const {
      recordSimpleSelect,
      frequency,
      responsible,
      category,
    } = this.props;
    console.log(frequency, responsible, category);
    const {
      frequencyST,
      responsibleST,
      categoryST,
    } = this.state;
    console.log('ST', frequencyST, responsibleST, categoryST);
    return (
      <SwitchLabel />
    );
  }
}

const mapStateToProps = state => state;

// const mapStateToProps = state => ({
//   frequency2: state.event.frequency, // from store, don't need it but without it's bugging
//   responsible2: state.event.responsible, // from store, don't need it but without it's bugging
//   category2: state.event.category, // from store, don't need it but without it's bugging
// });

SimpleSelectValues.propTypes = {
  frequency: PropTypes.string.isRequired,
  responsible: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  recordSimpleSelect: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    recordSimpleSelect,
  },
)(SimpleSelectValues);
