import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import { ToggleButton } from '../base/ToggleButton';
import { DATA_CONFIRMED, DATA_ACTIVE, DATA_RECOVERED, DATA_DEATHS } from '../../constants/Chart';

const DataTypeSwitch = ({ dataType, onChangeType }) => {
  return (
    <View style={styles.typeContainer}>
      <ToggleButton
        title="Confirmed"
        selected={dataType === DATA_CONFIRMED}
        color="#999"
        selectedColor={Colors.confirmed}
        onPress={() => onChangeType(DATA_CONFIRMED)}
      />
      <ToggleButton
        title="Active"
        selected={dataType === DATA_ACTIVE}
        color="#999"
        selectedColor={Colors.active}
        onPress={() => onChangeType(DATA_ACTIVE)}
      />
      <ToggleButton
        title="Recovered"
        selected={dataType === DATA_RECOVERED}
        color="#999"
        selectedColor={Colors.recovered}
        onPress={() => onChangeType(DATA_RECOVERED)}
      />
      <ToggleButton
        title="Deaths"
        selected={dataType === DATA_DEATHS}
        color="#999"
        selectedColor={Colors.deaths}
        onPress={() => onChangeType(DATA_DEATHS)}
      />
    </View>
  );
};

export default DataTypeSwitch;

const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
});
