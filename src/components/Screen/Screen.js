import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';

const Screen = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
