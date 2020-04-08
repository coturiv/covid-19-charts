import React from 'react';
import { StyleSheet, View } from 'react-native';

const Panel = ({ style, noMargin, noPadding, children }) => {
  const s = [
    styles.container,
    noMargin ? null : styles.margin,
    noPadding ? null : styles.padding,
    style,
  ];
  return <View style={s}>{children}</View>;
};

export default Panel;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  margin: {
    marginBottom: 16,
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
