import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import RawMoodChart from './RawMoodChart';
import MoodEmoticons from './MoodEmoticons';

const MoodChart = (props) => {
  const { moodArray, dayNamesArray } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="stretch">
      <Grid item xs={1}>
        <div style={{ height: '100%' }}>
          <MoodEmoticons />
        </div>
      </Grid>
      <Grid item xs={11}>
        <div style={{ height: '100%' }}>
          <RawMoodChart moodArray={moodArray} dayNamesArray={dayNamesArray} />
        </div>
      </Grid>
    </Grid>
  );
};

RawMoodChart.propTypes = {
  moodArray: PropTypes.array,
  dayNamesArray: PropTypes.array,
};

RawMoodChart.defaultProps = {
  moodArray: [],
  dayNamesArray: [],
};

export default MoodChart;
