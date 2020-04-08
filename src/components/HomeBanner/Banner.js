import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { toLocaleNumberString } from '../../libs/number';
import TouchablePanel from '../Panel/TouchablePanel';
import { getTitleSubtitle } from '../../libs/favorites';

const Banner = ({ day, location, province, country, confirmed, recovered, deaths, onPress }) => {
  const conf = toLocaleNumberString(confirmed);
  const recov = toLocaleNumberString(recovered);
  const death = toLocaleNumberString(deaths);
  const act = toLocaleNumberString(confirmed - recovered - deaths);

  const [title, subtitle1, subtitle2] = getTitleSubtitle(country, province, location);

  return (
    <TouchablePanel onPress={onPress}>
      <View style={styles.innerContainer}>
        <View style={styles.columnLeft}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle1 && <Text style={styles.subtitle}>{subtitle1}</Text>}
          {!!subtitle2 && <Text style={styles.subtitle}>{subtitle2}</Text>}
        </View>
        <View style={styles.columnMiddle}>
          <Text style={styles.confirmedHint}>confirmed</Text>
          <Text style={styles.confirmed}>{conf}</Text>
          <Text style={styles.confirmedHint}>{day}</Text>
        </View>
        <View style={styles.columnRight}>
          <View style={styles.numberContainer}>
            <Text style={styles.active}>{act}</Text>
            <Text style={styles.numberHint}>a.</Text>
          </View>
          <View style={styles.numberContainer}>
            <Text style={styles.recovered}>{recov}</Text>
            <Text style={styles.numberHint}>r.</Text>
          </View>
          <View style={styles.numberContainer}>
            <Text style={styles.deaths}>{death}</Text>
            <Text style={styles.numberHint}>d.</Text>
          </View>
        </View>
      </View>
    </TouchablePanel>
  );
};

export default Banner;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 0,
    paddingVertical: 8,
  },
  columnLeft: {
    flex: 1,
  },
  columnMiddle: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  columnRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  numberHint: {
    fontSize: 12,
    color: '#999',
    width: 18,
    textAlign: 'center',
  },
  confirmedHint: {
    fontSize: 12,
    color: '#999',
  },
  confirmed: {
    fontSize: 24,
    color: Colors.confirmed,
  },
  active: {
    fontSize: 16,
    color: Colors.active,
  },
  recovered: {
    fontSize: 16,
    color: Colors.recovered,
  },
  deaths: {
    fontSize: 16,
    color: Colors.deaths,
  },
});
