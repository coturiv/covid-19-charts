import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const ToggleButton = ({
  title,
  disabled,
  selected,
  selectedColor = '#000',
  titleColor = Colors.grey,
  titleDisabledColor = '#aaa',
  style,
  onPress,
  children,
  ...rest
}) => {
  const handlePress = () => {
    if (!disabled && typeof onPress === 'function') {
      onPress();
    }
  };

  const containerStyle = selected
    ? [styles.container, style, { borderColor: selectedColor }]
    : [styles.container, style, { borderColor: '#fff' }];

  const titleStyle = disabled
    ? [styles.title, { color: titleDisabledColor }]
    : [styles.title, { color: selected ? selectedColor : titleColor }];

  return (
    <TouchableOpacity
      {...rest}
      onPress={handlePress}
      style={containerStyle}
      disabled={disabled}
      activeOpacity={0.6}
    >
      <View style={styles.row}>
        <Text style={titleStyle}>{title || children || ' '}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { ToggleButton };

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 14,
    marginLeft: 8,
    marginRight: 8,
  },
});
