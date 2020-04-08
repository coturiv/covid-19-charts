import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Paragraph = ({ title, children }) => {
  return (
    <Text style={styles.text}>
      {!!title && <Text style={styles.title}>{`${title} `}</Text>}
      {children}
    </Text>
  );
};

export default Paragraph;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: '#888',
    paddingBottom: 8,
  },
  title: {
    color: '#000',
  },
});
