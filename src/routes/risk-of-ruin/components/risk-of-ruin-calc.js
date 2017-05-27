import React, { PropTypes } from 'react';
import 'styles/twoDimensionDataTable.scss';
import { Line } from 'react-chartjs-2';
import { NormalDensityZx } from 'utils/normal-dist';

import compose from 'lodash/fp/compose';
import times from 'lodash/fp/times';
import { multiMap } from 'utils/lodashExt';

function closestUnderRiskF(increment, riskX) {
  return (dp, i) => (Math.abs(riskX - i) < 1);
}


function convertI(increment, deviation) {
  return i => (i * increment) - deviation;
}
function transformToDensity(i) {
  return {
    i,
    dp: NormalDensityZx(i, 0, 1),
  };
}

function createChartData(deviation, increment, riskX) {
  const chartPoints = Math.floor((deviation * 2) / increment);
  const closestUnderRisk = closestUnderRiskF(increment, riskX);

  const getLabelForI = (dp, i) => {
    switch (true) {
      case closestUnderRisk(dp, i):
        return dp;
      default:
        return '';
    }
  };

  const chartData = compose(
    multiMap({
      labels: dict => getLabelForI(dict.dp, dict.i),
      normalChart: dict => dict.dp,
      riskChart: dict => ((dict.i < riskX) ? dict.dp : null),
    }),
    times(i => compose(
      transformToDensity,
      convertI(increment, deviation),
    )(i)),
  )(chartPoints);
  return chartData;
}

const chartData = createChartData(4, 0.2, -3);

const lineChartData = {
  labels: chartData.labels,
  datasets: [
    {
      backgroundColor: 'rgba(224, 121, 138, 0.8)',
      borderWidth: 0,
      data: chartData.riskChart,
    },
    {
      fillColor: 'rgba(151,187,205,0)',
      pointRadius: 0,
      showPoint: false,
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      data: chartData.normalChart,
    },
  ],
};

export const RiskOfRuinCalc = props => (
  <div>
    <div>
      <Line
        data={lineChartData}
        width={100}
        height={500}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  </div>
);

RiskOfRuinCalc.propTypes = {
  calcResult: PropTypes.shape({
    symbolModel: PropTypes.shape({}),
    correlations: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  }),
};

export default RiskOfRuinCalc;
