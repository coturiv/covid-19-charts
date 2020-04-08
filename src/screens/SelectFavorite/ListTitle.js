import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const ListTitle = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default ListTitle;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingBottom: 16,
    color: Colors.tintColor,
  },
});
