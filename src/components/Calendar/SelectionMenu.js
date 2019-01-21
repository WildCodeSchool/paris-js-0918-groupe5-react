import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';

import SelectionMenuItems from './SelectionMenuItems';

import { recordContact, recordCategory, recordFrequency } from '../../actions/eventActions';

const SelectionMenu = ({
  listOfcontact,
  listOfCategories,
  listOfFrequency,
  saveContact,
  saveCategory,
  saveFrequency,
  frequency,
  contact,
  category,
}) => (
  [
    {
      InputLabel: 'Responsable',
      type: 'contact',
      liste: listOfcontact,
      recordFunction: saveContact,
      fieldValue: contact,
      FormHelperText: 'Assigner un responsable à cet événement',
    },
    {
      InputLabel: 'Catégorie',
      type: 'category',
      liste: listOfCategories,
      recordFunction: saveCategory,
      fieldValue: category,
      FormHelperText: 'Assigner une catégorie à cet événement',
    },
    {
      InputLabel: 'Fréquence',
      type: 'frequency',
      liste: listOfFrequency,
      recordFunction: saveFrequency,
      fieldValue: frequency,
      FormHelperText: 'Séléctionner la récurence d un événement',
    },
  ].map(item => (
    <form key={item.type} className="SelectionMenu">
      <FormControl className="SelectionMenuItems" required>
        <InputLabel htmlFor={item.type}>{item.InputLabel}</InputLabel>
        <SelectionMenuItems
          type={item.type}
          listeOfChoices={item.liste}
          record={item.recordFunction}
          fieldValue={item.fieldValue}
        />
        <FormHelperText>{item.FormHelperText}</FormHelperText>
      </FormControl>
    </form>
  ))
);

SelectionMenu.propTypes = {
  listOfcontact: PropTypes.array.isRequired,
  listOfCategories: PropTypes.array.isRequired,
  listOfFrequency: PropTypes.array.isRequired,
  contact: PropTypes.string.isRequired,
  frequency: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  saveContact: PropTypes.func.isRequired,
  saveCategory: PropTypes.func.isRequired,
  saveFrequency: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  listOfcontact: state.event.listOfcontact,
  listOfCategories: state.event.listOfCategories,
  listOfFrequency: state.event.listOfFrequency,
  frequency: state.event.frequency,
  contact: state.event.contact,
  category: state.event.category,
});

const mapDispatchToProps = dispatch => ({
  saveContact: (value, id) => dispatch(recordContact(value, id)),
  saveCategory: value => dispatch(recordCategory(value)),
  saveFrequency: value => dispatch(recordFrequency(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionMenu);
