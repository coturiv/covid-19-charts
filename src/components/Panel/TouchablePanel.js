import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Colors from '../../constants/Colors';

const TouchablePanel = ({ onPress, style, noMargin, children }) => {
  const s = [styles.container, noMargin ? null : styles.margin, style];
  return (
    <TouchableHighlight style={s} onPress={onPress} underlayColor={Colors.panelHighlight}>
      {children}
    </TouchableHighlight>
  );
};

export default TouchablePanel;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  margin: {
    marginBottom: 16,
  },
});
