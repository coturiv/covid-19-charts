import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { toLocaleNumberString } from '../../libs/number';
import Colors from '../../constants/Colors';
import { toLongDateString, parseDayNumber } from '../../libs/date';
import TouchablePanel from '../Panel/TouchablePanel';
import { getLocationsFromKey } from '../../libs/favorites';
import { getColumnByType } from '../../repository/days/helpers';

const LocationColumn = ({ details }) => {
  return (
    <View>
      {details.map(d => {
        const { key, color } = d;
        const { country = '', province, location } = getLocationsFromKey(key);
        return (
          <Text key={key} style={[styles.location, { color }]} numberOfLines={1}>
            {location || province || country}
          </Text>
        );
      })}
    </View>
  );
};

const DayColumn = ({ details }) => {
  return (
    <View style={styles.column}>
      {details.map(d => {
        const {
          key,
          detail: { day },
        } = d;

        return (
          <Text key={key} style={styles.day} numberOfLines={1}>
            {toLongDateString(parseDayNumber(day))}
          </Text>
        );
      })}
    </View>
  );
};

const CasesColumn = ({ details, column }) => {
  return (
    <View style={styles.column}>
      {details.map(d => {
        const { key, color, detail } = d;
        return (
          <Text key={key} style={styles.cases}>
            <Text style={[styles.number, { color }]} numberOfLines={1}>
              {toLocaleNumberString(detail[column])}
            </Text>
            {' cases'}
          </Text>
        );
      })}
    </View>
  );
};

const ComparisonDayDetail = ({ dayDetailsOrder, dataSlices, chartType, dataType, onClose }) => {
  if (!dayDetailsOrder || !dataSlices || !dataSlices.length) {
    return null;
  }

  const details = dataSlices
    .map(s => {
      const { key, color, data } = s;
      const detail = data.find(d => d.order === dayDetailsOrder);
      return { key, color, detail };
    })
    .filter(d => d.detail);

  if (!details.length) {
    return null;
  }

  const [column] = getColumnByType(chartType, dataType);

  return (
    <TouchablePanel onPress={onClose} style={styles.container} noMargin>
      <View style={styles.wrapper}>
        <LocationColumn details={details} />
        <DayColumn details={details} />
        <CasesColumn details={details} column={column} />
      </View>
    </TouchablePanel>
  );
};

export default ComparisonDayDetail;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 1,
    borderBottomColor: Colors.tintColor,
    borderColor: Colors.tintColor,
  },
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  column: {
    alignItems: 'flex-end',
    paddingLeft: 12,
  },
  location: {
    fontWeight: 'bold',
  },
  day: {
    color: '#888',
    textAlign: 'right',
  },
  number: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  cases: {
    color: '#888',
    textAlign: 'right',
  },
});
