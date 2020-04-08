import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { toLongDateString, parseDayNumber } from '../../libs/date';
import Colors from '../../constants/Colors';

const FirstCase = ({ dayNumber }) => {
  const day = toLongDateString(parseDayNumber(dayNumber));

  if (!day) {
    return null;
  }

  return (
    <View>
      <Text style={styles.text}>
        {'First case: '}
        <Text style={styles.day}>{day}</Text>
      </Text>
    </View>
  );
};

export default FirstCase;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#000',
    paddingBottom: 16,
  },
  day: {
    color: Colors.tintColor,
  },
});
