import React from 'react';
import Grid from '@material-ui/core/Grid';
import visitNb from '../../assets/visitNb.png';
import moodCurve from '../../assets/moodCurve.png';

const Curves = () => {
  return (
    <div className="curves">
      <Grid container spacing={0}>
        <Grid item xs={6} className="gridVisitsNb">
          <p className="textVisitsNb">Nombre des dernières visites</p>
          <img src={visitNb} className="imageVisitsNb" alt="Number of visits" />
        </Grid>

        <Grid item xs={6}>
          <p className="textMoodCurve">Nombre des dernières visites</p>
          <img src={moodCurve} className="imageMoodCurve" alt="Mood Curve" />
        </Grid>

      </Grid>
    </div>
  );
};
export default Curves;
