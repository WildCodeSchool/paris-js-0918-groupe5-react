import React from 'react';
import { PropTypes } from 'prop-types';
import { Bar } from 'react-chartjs-2';

const VisitsChart = (props) => {
  const {
    nonFollowedVisitsArray,
    visitsArray,
    absencesArray,
    dayNamesArray,
  } = props;
  return (
    <div>
      <Bar
        data={{
          labels: dayNamesArray,
          datasets: [
            {
              label: 'NON VALIDÉES',
              data: absencesArray,
              backgroundColor: [
                '#fc8f72',
                '#fc8f72',
                '#fc8f72',
                '#fc8f72',
                '#fc8f72',
                '#fc8f72',
                '#fc8f72',
              ],
            },
            {
              label: 'VALIDÉES',
              data: visitsArray,
              backgroundColor: [
                '#65cde2',
                '#65cde2',
                '#65cde2',
                '#65cde2',
                '#65cde2',
                '#65cde2',
                '#65cde2',
              ],
            },
            {
              label: 'NON SUIVIES',
              data: nonFollowedVisitsArray,
              backgroundColor: [
                '#dcdad5',
                '#dcdad5',
                '#dcdad5',
                '#dcdad5',
                '#dcdad5',
                '#dcdad5',
                '#dcdad5',
              ],
            },
          ],
        }}
        options={{
          scales: {
            xAxes: [{
              stacked: true,
              categoryPercentage: 0.6,
              ticks: {
                padding: 15,
                fontStyle: 'bold',
                fontSize: 15,
                fontColor: '#b5b3af',
              },
              gridLines: {
                drawTicks: false,
                display: false,
              },
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                stepSize: 1,
                padding: 10,
                fontStyle: 'bold',
                fontSize: 15,
                fontColor: '#b5b3af',
              },
              gridLines: {
                drawTicks: true,
                color: '#dcdad5',
                zeroLineColor: '#dcdad5',
                lineWidth: 2,
                zeroLineWidth: 2,
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
            text: 'VISITES',
            fontSize: 18,
            fontColor: '#fc8f72',
            padding: 25,
          },
          legend: {
            display: true,
            position: 'bottom',
            reverse: true,
            labels: {
              boxWidth: 14,
              fontColor: '#b5b3af',
              fontStyle: 'bold',
              fontSize: 13,
              padding: 20,
            },
          },
        }}
      />
    </div>
  );
};

VisitsChart.propTypes = {
  nonFollowedVisitsArray: PropTypes.array,
  visitsArray: PropTypes.array,
  absencesArray: PropTypes.array,
  dayNamesArray: PropTypes.array,
};

VisitsChart.defaultProps = {
  nonFollowedVisitsArray: [],
  visitsArray: [],
  absencesArray: [],
  dayNamesArray: [],
};

export default VisitsChart;
