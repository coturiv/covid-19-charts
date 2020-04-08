import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListEmpty = () => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>No locations</Text>
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    color: '#ccc',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
