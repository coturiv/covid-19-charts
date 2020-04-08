import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Linking } from 'expo';
import Colors from '../../constants/Colors';

const TextLink = ({ href, children }) => {
  const onPress = () => {
    Linking.openURL(href);
  };

  return (
    <Text style={styles.title} onPress={onPress}>
      {children}
    </Text>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  title: {
    color: Colors.tintColor,
    textDecorationLine: 'underline',
  },
});
