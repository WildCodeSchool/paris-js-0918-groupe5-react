import React from 'react';
import { PropTypes } from 'prop-types';
import { Bar } from 'react-chartjs-2';

const VisitsChart = (props) => {
  const { visitsArray, absencesArray, dayNamesArray } = props;
  return (
    <div>
      <Bar
        data={{
          labels: dayNamesArray,
          datasets: [
            {
              label: 'ABSENCES',
              data: absencesArray,
              backgroundColor: [
                '#53a8b9',
                '#53a8b9',
                '#53a8b9',
                '#53a8b9',
                '#53a8b9',
                '#53a8b9',
                '#53a8b9',
              ],
            },
            {
              label: 'VISITES',
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
              left: 50,
              right: 30,
              top: 15,
              bottom: 15,
            },
          },
          title: {
            display: true,
            text: 'VISITES',
            fontSize: 18,
            fontColor: '#fc8f72',
            padding: 20,
          },
          legend: {
            display: true,
            position: 'left',
            reverse: true,
            labels: {
              boxWidth: 14,
              fontColor: '#b5b3af',
              fontStyle: 'bold',
              fontSize: 13,
            },
          },
        }}
      />
    </div>
  );
};

VisitsChart.propTypes = {
  visitsArray: PropTypes.array,
  absencesArray: PropTypes.array,
  dayNamesArray: PropTypes.array,
};

VisitsChart.defaultProps = {
  visitsArray: [],
  absencesArray: [],
  dayNamesArray: [],
};

export default VisitsChart;
