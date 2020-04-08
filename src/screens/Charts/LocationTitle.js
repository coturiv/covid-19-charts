import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { getTitleSubtitlePair } from '../../libs/favorites';

const LocationTitle = ({ location, province, country }) => {
  const [title, subtitle] = getTitleSubtitlePair(country, province, location, true, 'World');

  return (
    <Text style={styles.title}>
      <Text style={styles.strong}>{title}</Text>
      {subtitle}
    </Text>
  );
};

export default LocationTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingBottom: 16,
    color: Colors.tintColor,
  },
  strong: {
    fontWeight: 'bold',
  },
});
