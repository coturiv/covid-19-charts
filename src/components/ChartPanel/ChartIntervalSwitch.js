import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { INTERVAL_365, INTERVAL_30, INTERVAL_14 } from '../../constants/Chart';

const TypePanel = ({ onPress, title, selected }) => {
  const panelStyle = selected ? [styles.panel, styles.panelSelected] : styles.panel;
  const titleStyle = selected ? [styles.title, styles.titleSelected] : styles.title;
  const dayStyle = selected ? [styles.day, styles.titleSelected] : styles.day;

  return (
    <TouchableHighlight onPress={onPress} style={panelStyle} underlayColor={Colors.panelHighlight}>
      <>
        <Text style={titleStyle}>{title || ''}</Text>
        <Text style={dayStyle}>days</Text>
      </>
    </TouchableHighlight>
  );
};

const ChartIntervalSwitch = ({ chartInterval, onChangeInterval, show365, show30, show14 }) => {
  return (
    <View style={styles.typeContainer}>
      {show365 && (
        <TypePanel
          title="365"
          selected={chartInterval === INTERVAL_365}
          onPress={() => onChangeInterval(INTERVAL_365)}
        />
      )}
      {show30 && (
        <TypePanel
          title="30"
          selected={chartInterval === INTERVAL_30}
          onPress={() => onChangeInterval(INTERVAL_30)}
        />
      )}
      {show14 && (
        <TypePanel
          title="14"
          selected={chartInterval === INTERVAL_14}
          onPress={() => onChangeInterval(INTERVAL_14)}
        />
      )}
    </View>
  );
};

export default ChartIntervalSwitch;

const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: 'row',
    padding: 2,
  },
  panel: {
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
    paddingTop: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
  titleSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  day: {
    textAlign: 'center',
    fontSize: 12,
    paddingBottom: 8,
    paddingHorizontal: 8,
    color: '#888',
  },
});
