import React, { useState } from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryAxis, VictoryCursorContainer, VictoryLine } from 'victory-native';
import { parseDayNumber, toShortDateString, toDayNumber, addHours } from '../../libs/date';
import theme from './theme';
import { toLocaleNumberString } from '../../libs/number';
import Colors from '../../constants/Colors';
import { getColumnByType } from '../../repository/days/helpers';

const x = data => {
  const d = parseDayNumber(data.day);
  return d || 0;
};

const xTickFormat = d => `${toShortDateString(d)}`;
const yTickFormat = n =>
  n >= 10000 ? `${toLocaleNumberString(Math.round(n / 1000))}k` : toLocaleNumberString(n);

const LineChart = ({ data, dataType, chartType, onCursor }) => {
  const [width, setWidth] = useState();

  const onLayout = ({ nativeEvent }) => {
    const { width: w } = nativeEvent.layout;
    if (w) {
      setWidth(w);
    }
  };

  const [yType, type] = getColumnByType(chartType, dataType);

  const Line = (
    <VictoryLine
      name={type}
      data={data || []}
      x={x}
      y={yType}
      style={{ data: { stroke: Colors[type], strokeWidth: 3 } }}
    />
  );

  const onCursorChange = date => {
    if (!date || typeof onCursor !== 'function') {
      return;
    }
    const dayNumber = toDayNumber(addHours(date, 12));
    if (dayNumber) {
      onCursor(dayNumber);
    }
  };
  const CursorContainer = (
    <VictoryCursorContainer
      cursorDimension="x"
      cursorLabel={() => ' '}
      onCursorChange={onCursorChange}
      responsive={false}
    />
  );

  return (
    <View onLayout={onLayout}>
      {width > 0 && (
        <VictoryChart
          theme={theme}
          padding={{ top: 20, right: 20, bottom: 50, left: 55 }}
          height={300}
          width={width}
          domainPadding={{ x: 0, y: [5, 5] }}
          containerComponent={CursorContainer}
          scale={{ x: 'time', y: 'linear' }}
        >
          <VictoryAxis
            fixLabelOverlap
            style={{ tickLabels: { angle: -40 } }}
            tickFormat={xTickFormat}
          />
          <VictoryAxis
            dependentAxis
            minDomain={0}
            style={{ tickLabels: { padding: 4 }, grid: { stroke: '#e7e7e7' } }}
            tickFormat={yTickFormat}
          />
          {Line}
        </VictoryChart>
      )}
    </View>
  );
};

export default LineChart;
