import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextMessage = ({ children }) => {
  return <Text style={styles.message}>{children}</Text>;
};

export default TextMessage;

const styles = StyleSheet.create({
  message: {
    color: '#888',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
