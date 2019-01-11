import React from 'react';
import Grid from '@material-ui/core/Grid';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';

const MoodEmoticons = () => (
  <div style={{
    height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
  }}
  >
    <Grid container direction="column" justify="space-between" alignItems="flex-end" style={{ height: '73%', paddingTop: 33 }}>
      <Grid item>
        <div style={{ color: '#65cde2' }}>
          <SentimentSatisfiedAlt />
        </div>
      </Grid>
      <Grid item>
        <div style={{ color: '#65cde2' }}>
          <SentimentSatisfied />
        </div>
      </Grid>
      <Grid item>
        <div style={{ color: '#65cde2' }}>
          <SentimentVeryDissatisfied />
        </div>
      </Grid>
    </Grid>
  </div>
);

export default MoodEmoticons;
