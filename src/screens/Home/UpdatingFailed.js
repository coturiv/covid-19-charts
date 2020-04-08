import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '../../components/base/Buttons';
import Colors from '../../constants/Colors';
import Panel from '../../components/Panel/Panel';

const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;

const UpdatingFailed = ({ runUpdate, isUpdating }) => {
  function handleUpdate() {
    if (typeof runUpdate === 'function') {
      const toDate = new Date();
      runUpdate(toDate);
    }
  }

  return (
    <Panel style={styles.container}>
      <Text style={styles.title}>Downloading failed</Text>
      <Paragraph>Please check your internet connection and try again.</Paragraph>
      <Paragraph>
        If the problem persists, delete the data on the About tab and try downloading again.
      </Paragraph>
      <Button onPress={handleUpdate} disabled={isUpdating}>
        Update data
      </Button>
    </Panel>
  );
};

export default UpdatingFailed;

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
