import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Navigator from '../../navigation/Navigator';

const Layout = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="default" />
      ) : (
        <StatusBar barStyle="dark-content" />
      )}
      <Navigator />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
