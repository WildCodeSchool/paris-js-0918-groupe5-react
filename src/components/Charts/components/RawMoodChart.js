import React from 'react';
import { PropTypes } from 'prop-types';
import { Line } from 'react-chartjs-2';

const RawMoodChart = (props) => {
  const { moodArray, dayNamesArray } = props;
  return (
    <div>
      <Line
        data={{
          labels: dayNamesArray,
          datasets: [
            {
              label: 'Etat général',
              fill: false,
              data: moodArray,
              pointBackgroundColor: '#c2efeb',
              borderColor: '#65cde2',
              borderWidth: 7,
              pointRadius: 5,
            },
          ],
        }}
        options={{
          spanGaps: true,
          scales: {
            xAxes: [{
              ticks: {
                padding: 10,
                fontStyle: 'bold',
                fontSize: 15,
                fontColor: '#b5b3af',
              },
              gridLines: {
                color: '#dcdad5',
                lineWidth: 2,
              },
            }],
            yAxes: [{
              ticks: {
                stepSize: 1,
                min: -1,
                max: 11,
                display: false,
              },
              gridLines: {
                display: false,
                color: '#dcdad5',
              },
            }],
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          title: {
            display: true,
            text: 'ÉTAT GÉNÉRAL',
            fontSize: 18,
            fontColor: '#fc8f72',
            padding: 25,
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
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

export default RawMoodChart;
