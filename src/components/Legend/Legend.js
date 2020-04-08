import React from 'react';
import { StyleSheet, View } from 'react-native';

const Legend = ({ children, noMargin }) => {
  const style = noMargin ? [styles.container, { marginBottom: 0 }] : styles.container;

  return <View style={style}>{children}</View>;
};

export default Legend;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
