import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const SectionTitle = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingTop: 16,
    paddingBottom: 16,
    color: Colors.tintColor,
  },
});
