import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BarChart from '../Chart/BarChart';
import Panel from '../Panel/Panel';
import { useChartOptions } from '../../screens/Charts/ChartOptionsContext';
import DataTypeSwitch from './DataTypeSwitch';
import DateSlider from './DateSlider';
import DayDetail from './DayDetail';
import ChartTypeSwitch from './ChartTypeSwitch';
import LineChart from '../Chart/LineChart';
import ChartIntervalSwitch from './ChartIntervalSwitch';
import { INTERVAL_14 } from '../../constants/Chart';
import GraphLegend from '../Legend/GraphLegend';
import FirstCase from './FirstCase';

const getMaxShift = (dataLength, chartInterval) => Math.max(0, dataLength - chartInterval);

const ChartPanel = ({ data }) => {
  const {
    dataType,
    setDataType,
    chartType,
    setChartType,
    chartInterval,
    setChartInterval,
  } = useChartOptions();

  const [dayDetail, setDayDetail] = useState();

  const dataLength = data && data.length;
  const maxDataOrder = dataLength ? data[dataLength - 1].order : 0;
  const [daysShift, setDaysShift] = useState(getMaxShift(maxDataOrder, chartInterval));

  const dataSlice = useMemo(() => {
    const maxOrd = daysShift + chartInterval;
    const sl = data.filter(d => d.order > daysShift && d.order <= maxOrd);
    return sl;
  }, [data, daysShift, chartInterval]);

  const onShiftInterval = left => {
    setDayDetail(null);
    setDaysShift(left);
  };

  // index cannot be used, some days may be missing
  // const getDay = index => (index < dataLength ? data[index].day : '');
  const getLeftDay = index => {
    const ind = index + 1;
    const day = data.reduce((acc, curr) => {
      if (curr.order >= ind && (!acc || curr.order < acc.order)) {
        return curr;
      }
      return acc;
    }, null);
    return day ? day.day : '';
  };
  const getRightDay = index => {
    const ind = index + 1;
    const day = data.reduce((acc, curr) => {
      if (curr.order <= ind && (!acc || curr.order > acc.order)) {
        return curr;
      }
      return acc;
    }, null);
    return day ? day.day : '';
  };

  const onCursor = dayNumber => {
    const detail = dataSlice.find(d => d.day === dayNumber);
    if (detail !== dayDetail) {
      setDayDetail(detail);
    }
  };

  const closeDetail = () => {
    setDayDetail(null);
  };

  const onChangeChart = type => {
    setDayDetail(null);
    setChartType(type);
  };

  const onChangeType = type => {
    setDayDetail(null);
    setDataType(type);
  };

  const onChangeInterval = interval => {
    setDayDetail(null);
    setChartInterval(interval);
    setDaysShift(getMaxShift(maxDataOrder, interval));
  };

  return (
    <View>
      <Panel noPadding>
        <ChartTypeSwitch chartType={chartType} onChangeChart={onChangeChart} />
      </Panel>
      <Panel noPadding>
        <DataTypeSwitch dataType={dataType} onChangeType={onChangeType} />
        <View style={styles.chartContainer}>
          {chartInterval === INTERVAL_14 ? (
            <BarChart
              data={dataSlice}
              chartType={chartType}
              dataType={dataType}
              onCursor={onCursor}
            />
          ) : (
            <LineChart
              data={dataSlice}
              chartType={chartType}
              dataType={dataType}
              onCursor={onCursor}
            />
          )}
        </View>
        <View style={styles.sliderContainer}>
          <DateSlider
            maximum={maxDataOrder - 1}
            interval={chartInterval}
            daysShift={daysShift}
            getLeftDay={getLeftDay}
            getRightDay={getRightDay}
            onShiftInterval={onShiftInterval}
          />
        </View>
      </Panel>
      <View style={styles.intervalContainer}>
        <Panel noPadding>
          <ChartIntervalSwitch
            chartInterval={chartInterval}
            onChangeInterval={onChangeInterval}
            show365
            show30
            show14
          />
        </Panel>
      </View>
      <FirstCase dayNumber={dataLength && data[0].day} />
      <GraphLegend />
      <DayDetail detail={dayDetail} onClose={closeDetail} />
    </View>
  );
};

export default ChartPanel;

const styles = StyleSheet.create({
  chartContainer: {
    height: 300,
    width: '100%',
  },
  sliderContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  intervalContainer: {
    alignItems: 'flex-end',
  },
});
