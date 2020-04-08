import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Panel from '../Panel/Panel';
import DataTypeSwitch from '../ChartPanel/DataTypeSwitch';
import RelativeDateSlider from './RelativeDateSlider';
import ChartTypeSwitch from '../ChartPanel/ChartTypeSwitch';
import ChartIntervalSwitch from '../ChartPanel/ChartIntervalSwitch';
import { useComparisonContex } from '../../screens/Comparison/ComparisonContext';
import MultiLineChart from '../Chart/MultiLineChart';
import ComparisonDayDetail from './ComparisonDayDetail';
import Colors from '../../constants/Colors';
import FavoriteSelector from '../FavoriteSelector';

const ComparisonPanel = ({ compared, onToggleCompared, navigation }) => {
  const {
    dataType,
    setDataType,
    chartType,
    setChartType,
    chartInterval,
    setChartInterval,
  } = useComparisonContex();

  const [dayDetailsOrder, setDayDetailsOrder] = useState();

  const [daysShift, setDaysShift] = useState(0);

  const dataSlices = useMemo(() => {
    setDayDetailsOrder(null);
    const maxOrd = daysShift + chartInterval;
    return compared.map(dt => {
      const { key, color, data, maxOrder } = dt;
      const sl = data.filter(d => d.order > daysShift && d.order <= maxOrd);
      return { key, color, data: sl, maxOrder };
    });
  }, [daysShift, chartInterval, compared]);

  const onShiftInterval = left => {
    setDayDetailsOrder(null);
    setDaysShift(left);
  };

  const onCursor = dayOrder => {
    if (dayOrder !== dayDetailsOrder) {
      setDayDetailsOrder(dayOrder);
    }
  };

  const closeDetail = () => {
    setDayDetailsOrder(null);
  };

  const onChangeChart = type => {
    setDayDetailsOrder(null);
    setChartType(type);
  };

  const onChangeType = type => {
    setDayDetailsOrder(null);
    setDataType(type);
  };

  const onChangeInterval = interval => {
    setDayDetailsOrder(null);
    setDaysShift(0);
    setChartInterval(interval);
  };

  const toggleCompared = key => {
    setDayDetailsOrder(null);
    setDaysShift(0);
    onToggleCompared(key);
  };

  const maxDataOrder = compared.reduce((acc, curr) => Math.max(acc, curr.maxOrder), 1);

  const hasData = dataSlices && dataSlices.some(({ data }) => data && data.length > 0);

  return (
    <View>
      <Panel noPadding>
        <ChartTypeSwitch chartType={chartType} onChangeChart={onChangeChart} />
      </Panel>
      <Panel noPadding>
        <DataTypeSwitch dataType={dataType} onChangeType={onChangeType} />
        <View style={styles.chartContainer}>
          {hasData ? (
            <MultiLineChart
              dataSets={dataSlices}
              chartType={chartType}
              dataType={dataType}
              onCursor={onCursor}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                {dataSlices.length > 0
                  ? 'No data available.'
                  : 'Select locations from bottom list.'}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.sliderContainer}>
          <RelativeDateSlider
            maximum={maxDataOrder - 1}
            interval={chartInterval}
            daysShift={daysShift}
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
          />
        </Panel>
      </View>
      <FavoriteSelector selected={compared} onToggle={toggleCompared} navigation={navigation} />
      <ComparisonDayDetail
        dayDetailsOrder={dayDetailsOrder}
        dataSlices={dataSlices}
        chartType={chartType}
        dataType={dataType}
        onClose={closeDetail}
      />
    </View>
  );
};

export default ComparisonPanel;

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
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: Colors.grey,
  },
});
