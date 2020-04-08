import React, { useState } from 'react';
import { View } from 'react-native';
import {
  VictoryChart,
  VictoryAxis,
  VictoryCursorContainer,
  VictoryLine,
  VictoryGroup,
} from 'victory-native';
import theme from './theme';
import { toLocaleNumberString } from '../../libs/number';
import { getColumnByType } from '../../repository/days/helpers';

const x = data => data.order;

const xTickFormat = d => `Day ${Math.round(d)}`;
const yTickFormat = n =>
  n >= 10000 ? `${toLocaleNumberString(Math.round(n / 1000))}k` : toLocaleNumberString(n);

const MultiLineChart = ({ dataSets, dataType, chartType, onCursor }) => {
  const [width, setWidth] = useState();

  const onLayout = ({ nativeEvent }) => {
    const { width: w } = nativeEvent.layout;
    if (w) {
      setWidth(w);
    }
  };

  const [yType, type] = getColumnByType(chartType, dataType);

  const Lines = dataSets.map(dt => {
    const { key, color, data } = dt;
    if (data.length) {
      return (
        <VictoryLine
          key={key}
          name={type}
          data={data}
          x={x}
          y={yType}
          style={{ data: { stroke: color, strokeWidth: 3 } }}
        />
      );
    }
    return null;
  });

  const onCursorChange = xVal => {
    if (!xVal || typeof onCursor !== 'function') {
      return;
    }
    const dayOrder = Math.round(xVal);
    if (dayOrder) {
      onCursor(dayOrder);
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
          scale={{ x: 'linear', y: 'linear' }}
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
          <VictoryGroup>{Lines}</VictoryGroup>
        </VictoryChart>
      )}
    </View>
  );
};

export default MultiLineChart;
