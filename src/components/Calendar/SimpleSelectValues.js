import React from 'react';
import { connect } from 'react-redux';
import { recordSimpleSelect } from '../../actions/eventActions';
import SwitchLabel from './SwitchLabels';


const SimpleSelectValues = (props) => {
  const {
    recordSimpleSelect,
    frequency,
    responsible,
    category
  } = props;
  recordSimpleSelect(frequency, responsible, category);
  return (
    <SwitchLabel />
  );
};


const mapStateToProps = state => state;

// const mapStateToProps = state => ({
//   frequency2: state.event.frequency, // from store, don't need it
//   responsible2: state.event.responsible, // from store, don't need it
//   category2: state.event.category, // from store, don't need it
// });


export default connect(
  mapStateToProps,
  {
    recordSimpleSelect,
  },
)(SimpleSelectValues);
