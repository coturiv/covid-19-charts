import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/Colors';

const FindInput = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Find..."
      clearButtonMode="while-editing"
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default FindInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 4,
    color: Colors.tintColor,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
  },
});
