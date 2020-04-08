import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';

const ScrollScreen = ({ contentStyle, children }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, contentStyle]}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default ScrollScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
