import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { toLocaleNumberString } from '../../libs/number';
import Colors from '../../constants/Colors';
import { toLongDateString, parseDayNumber } from '../../libs/date';
import TouchablePanel from '../Panel/TouchablePanel';

const FirstColumn = ({ day }) => {
  return (
    <View>
      <Text style={styles.dayHeader} numberOfLines={1}>
        {toLongDateString(parseDayNumber(day))}
      </Text>
      <Text style={styles.textName} numberOfLines={1}>
        Confirmed:
      </Text>
      <Text style={styles.textName} numberOfLines={1}>
        Active:
      </Text>
      <Text style={styles.textName} numberOfLines={1}>
        Recovered:
      </Text>
      <Text style={styles.textName} numberOfLines={1}>
        Deaths:
      </Text>
    </View>
  );
};

const Column = ({ title, confirmed, active, recovered, deaths }) => {
  return (
    <View style={styles.column}>
      <Text style={styles.columnHeader} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.valueConfirmed} numberOfLines={1}>
        {toLocaleNumberString(confirmed)}
      </Text>
      <Text style={styles.valueActive} numberOfLines={1}>
        {toLocaleNumberString(active)}
      </Text>
      <Text style={styles.valueRecovered} numberOfLines={1}>
        {toLocaleNumberString(recovered)}
      </Text>
      <Text style={styles.valueDeaths} numberOfLines={1}>
        {toLocaleNumberString(deaths)}
      </Text>
    </View>
  );
};

const DayDetail = ({ detail, onClose }) => {
  if (!detail) {
    return null;
  }

  return (
    <TouchablePanel onPress={onClose} style={styles.container} noMargin>
      <View style={styles.wrapper}>
        <FirstColumn day={detail.day} />
        <Column
          title="cumul."
          confirmed={detail.confirmed}
          active={detail.active}
          recovered={detail.recovered}
          deaths={detail.deaths}
        />
        <Column
          title="daily"
          confirmed={detail.confirmedDaily}
          active={detail.activeDaily}
          recovered={detail.recoveredDaily}
          deaths={detail.deathsDaily}
        />
        <Column
          title="%"
          confirmed={detail.confirmedPerc}
          active={detail.activePerc}
          recovered={detail.recoveredPerc}
          deaths={detail.deathsPerc}
        />
      </View>
    </TouchablePanel>
  );
};

export default DayDetail;

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
  dayHeader: {
    color: Colors.tintColor,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  columnHeader: {
    color: '#888',
    paddingBottom: 8,
  },
  textName: {
    color: '#888',
  },
  valueConfirmed: {
    color: Colors.confirmed,
    textAlign: 'right',
  },
  valueActive: {
    color: Colors.active,
    textAlign: 'right',
  },
  valueRecovered: {
    color: Colors.recovered,
    textAlign: 'right',
  },
  valueDeaths: {
    color: Colors.deaths,
    textAlign: 'right',
  },
});
