import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const Radio = ({
  title,
  disabled,
  selected,
  color = '#000',
  selectedColor = '#000',
  titleColor = '#000',
  titleDisabledColor = '#aaa',
  onPress,
  children,
  ...rest
}) => {
  const handlePress = () => {
    if (!disabled && typeof onPress === 'function') {
      onPress();
    }
  };

  const titleStyle = disabled
    ? [styles.title, { color: titleDisabledColor }]
    : [styles.title, { color: titleColor }];

  return (
    <TouchableOpacity
      {...rest}
      onPress={handlePress}
      style={styles.container}
      disabled={disabled}
      activeOpacity={0.6}
    >
      <View style={styles.row}>
        <Icon
          title={title}
          name={selected ? 'radiobox-marked' : 'radiobox-blank'}
          size={18}
          focused={selected}
          color={color}
          focusedColor={selectedColor}
        />
        <Text style={titleStyle}>{title || children || ' '}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { Radio };

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 13,
    marginLeft: 4,
    marginRight: 8,
  },
});
