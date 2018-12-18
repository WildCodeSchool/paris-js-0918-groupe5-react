import React from 'react';
import { connect } from 'react-redux';
import { recordSimpleSelect } from '../../actions/eventActions';

const SimpleSelectValues = (props) => {
  console.log(props);
  recordSimpleSelect(props);
  return (
    <div>toto</div>
  );
};


const mapStateToProps = state => ({
  frequency: state.event.name,
});


export default connect(
  mapStateToProps,
  {
    recordSimpleSelect,
  },
)(SimpleSelectValues);
