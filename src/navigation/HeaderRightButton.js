import * as React from 'react';
import { TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function HeaderRightButton({ name, size = 30, disabled, loading, onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.container}
      disabled={disabled || loading}
      underlayColor={Colors.headerBackground}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <MaterialCommunityIcons name={name} size={size} color="#fff" />
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});
