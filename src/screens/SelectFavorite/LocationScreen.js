import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DAYS_LOCATION } from '../../repository/constants';
import List from '../../components/List/List';
import ListItem, { ITEM_HEIGHT } from '../../components/List/ListItem';
import SelectedLocationPanel from './SelectedLocationPanel';
import ListTitle from './ListTitle';
import useAddFavorite from '../../repository/favorites/useAddFavorite';
import useLocations from '../../repository/days/useLocations';
import Screen from '../../components/Screen/Screen';
import Panel from '../../components/Panel/Panel';
import FindInput from './FindInput';
import TextMessage from './TextMessage';
import { getFilteredList } from './helpers';

const keyExtractor = item => item[DAYS_LOCATION];

const LocationScreen = ({ route, navigation }) => {
  const { country, province } = route.params;

  const [filter, setFilter] = useState();

  const { data, error, isPending } = useLocations(country, province);

  const { run: runAdd } = useAddFavorite();

  const onPress = () => {
    runAdd({ country, province, location: '' });
    navigation.navigate('Homepage');
  };

  const onPressItem = title => {
    runAdd({ country, province, location: title });
    navigation.navigate('Homepage');
  };

  const Item = ({ item }) => <ListItem title={item[DAYS_LOCATION]} onPressItem={onPressItem} />;

  const filtered = getFilteredList(filter, isPending ? null : data, DAYS_LOCATION);
  const showFilter = !!data && data.length > 0;
  const showList = !isPending && !!filtered;

  return (
    <Screen>
      <SelectedLocationPanel title={province} subtitle={country} onPress={onPress} />
      <ListTitle>County</ListTitle>
      {showFilter && <FindInput onChangeText={setFilter} value={filter} />}
      <Panel style={styles.listContainer} noPadding>
        {isPending && <TextMessage>Loading...</TextMessage>}
        {error && <TextMessage>Error</TextMessage>}
        {showList && (
          <List data={filtered} Item={Item} itemHeight={ITEM_HEIGHT} keyExtractor={keyExtractor} />
        )}
      </Panel>
    </Screen>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
