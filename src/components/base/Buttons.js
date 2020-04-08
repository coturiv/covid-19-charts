import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import Colors from '../../constants/Colors';

const Button = ({ title, disabled, onPress, children, ...rest }) => {
  const handlePress = () => {
    if (!disabled && typeof onPress === 'function') {
      onPress();
    }
  };
  const containerStyle = disabled ? [styles.container, styles.disabled] : styles.container;

  return (
    <TouchableHighlight
      {...rest}
      onPress={handlePress}
      style={containerStyle}
      disabled={disabled}
      underlayColor={Colors.buttonBackground}
    >
      <Text style={styles.title}>{title || children || ' '}</Text>
    </TouchableHighlight>
  );
};

export { Button };

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: Colors.buttonBackground,
  },
  disabled: {
    backgroundColor: '#aaa',
  },
  title: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
