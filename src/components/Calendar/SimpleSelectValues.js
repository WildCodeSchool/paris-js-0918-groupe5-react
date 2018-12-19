import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recordSimpleSelect } from '../../actions/eventActions';
import SwitchLabels from './SwitchLabels';


const SimpleSelectValues = (props) => {
  const {
    recordSimpleSelect,
    frequency,
    responsible,
    category,
  } = props;
  recordSimpleSelect(frequency, responsible, category);
  return (
    <SwitchLabels />
  );
};

SimpleSelectValues.propTypes = {
  recordSimpleSelect: PropTypes.func.isRequired,
  frequency: PropTypes.string.isRequired,
  responsible: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  frequency2: state.event.frequency, // from store, don't need it
  responsible2: state.event.responsible, // from store, don't need it
  category2: state.event.category, // from store, don't need it
});


export default connect(
  mapStateToProps,
  {
    recordSimpleSelect,
  },
)(SimpleSelectValues);
