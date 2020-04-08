import React from 'react';
import { View, StyleSheet } from 'react-native';

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

export default ItemSeparator;

const styles = StyleSheet.create({
  itemSeparator: {
    borderColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
});
