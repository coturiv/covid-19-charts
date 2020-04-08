import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const LINE_HEIGHT = 3;

const ProgressLine = ({
  total,
  currentIndex,
  color,
  backgroundColor,
  height = LINE_HEIGHT,
  style,
}) => {
  const containerStyle = [styles.container, { backgroundColor, height }, style];

  const width =
    total <= 0 ? 0 : Math.min(100, Math.round((Math.max(currentIndex, 0) / total) * 100));
  const lineStyle = [
    styles.line,
    { backgroundColor: color || Colors.buttonBackground, width: `${width}%` },
  ];

  return (
    <View style={containerStyle}>
      <View style={lineStyle} />
    </View>
  );
};

export default ProgressLine;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden',
  },
  line: {
    height: '100%',
    backgroundColor: Colors.buttonBackground,
  },
});
