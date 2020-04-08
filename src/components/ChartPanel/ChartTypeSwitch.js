import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { CHART_CUMULATIVE, CHART_DAILY, CHART_PERCENTAGE } from '../../constants/Chart';

const TypePanel = ({ onPress, title, selected }) => {
  const panelStyle = selected ? [styles.panel, styles.panelSelected] : styles.panel;
  const titleStyle = selected ? [styles.title, styles.titleSelected] : styles.title;

  return (
    <TouchableHighlight onPress={onPress} style={panelStyle} underlayColor={Colors.panelHighlight}>
      <Text style={titleStyle}>{title || ''}</Text>
    </TouchableHighlight>
  );
};

const ChartTypeSwitch = ({ chartType, onChangeChart }) => {
  return (
    <View style={styles.typeContainer}>
      <TypePanel
        title="Cumulative totals"
        selected={chartType === CHART_CUMULATIVE}
        onPress={() => onChangeChart(CHART_CUMULATIVE)}
      />
      <TypePanel
        title="Daily increments"
        selected={chartType === CHART_DAILY}
        onPress={() => onChangeChart(CHART_DAILY)}
      />
      <TypePanel
        title="Percentage increments"
        selected={chartType === CHART_PERCENTAGE}
        onPress={() => onChangeChart(CHART_PERCENTAGE)}
      />
    </View>
  );
};

export default ChartTypeSwitch;

const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: 'row',
    padding: 2,
  },
  panel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  panelSelected: {
    backgroundColor: Colors.headerBackground,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    padding: 8,
    color: Colors.grey,
  },
  titleSelected: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
