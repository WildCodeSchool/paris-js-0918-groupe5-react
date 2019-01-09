import React from 'react';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const SelectMultipleDays = () => (
  <Select>
    <Checkbox value="everyMonday">Tous les lundis</Checkbox>
    <Checkbox value="eveyTuesday">Tous les mardis</Checkbox>
    <Checkbox value="everyWednesday">Tous les mercredis</Checkbox>
    <Checkbox value="everyThursday">Tous les jeudis</Checkbox>
    <Checkbox value="everyFriday">Tous les vendredis</Checkbox>
    <Checkbox value="everySaturday">Tous les samedis</Checkbox>
  </Select>
);

export default SelectMultipleDays;
