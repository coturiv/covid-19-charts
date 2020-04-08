import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '../../components/base/Buttons';
import Colors from '../../constants/Colors';
import Panel from '../../components/Panel/Panel';

const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;

const NoneData = ({ runUpdate, isUpdating }) => {
  function handleUpdate() {
    if (typeof runUpdate === 'function') {
      const toDate = new Date();
      runUpdate(toDate);
    }
  }

  return (
    <Panel style={styles.container}>
      <Text style={styles.title}>You don&apos;t have any data on your device yet.</Text>
      <Paragraph>Please download the fresh data first.</Paragraph>
      <Paragraph>
        The first download may take several minutes and requires an Internet connection.
      </Paragraph>
      <Paragraph>You will be able to delete the downloaded data on the About tab.</Paragraph>
      <Button onPress={handleUpdate} disabled={isUpdating}>
        Download data
      </Button>
    </Panel>
  );
};

export default NoneData;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    color: Colors.tintColor,
  },
  text: {
    textAlign: 'center',
    marginBottom: 16,
    color: Colors.grey,
  },
});
