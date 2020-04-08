import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DAYS_PROVINCE_STATE } from '../../repository/constants';
import List from '../../components/List/List';
import ListItem, { ITEM_HEIGHT } from '../../components/List/ListItem';
import SelectedLocationPanel from './SelectedLocationPanel';
import ListTitle from './ListTitle';
import useAddFavorite from '../../repository/favorites/useAddFavorite';
import useProvinces from '../../repository/days/useProvinces';
import Panel from '../../components/Panel/Panel';
import Screen from '../../components/Screen/Screen';
import FindInput from './FindInput';
import TextMessage from './TextMessage';
import { getFilteredList } from './helpers';

const keyExtractor = item => item[DAYS_PROVINCE_STATE];

const ProvinceScreen = ({ route, navigation }) => {
  const { country } = route.params;

  const [filter, setFilter] = useState();

  const { data, error, isPending } = useProvinces(country);

  const { run: runAdd } = useAddFavorite();

  const onPress = () => {
    runAdd({ country, province: '', location: '' });
    navigation.navigate('Homepage');
  };

  const onPressItem = title => {
    navigation.navigate('Locations', { country, province: title });
  };

  const Item = ({ item }) => (
    <ListItem title={item[DAYS_PROVINCE_STATE]} onPressItem={onPressItem} />
  );

  const filtered = getFilteredList(filter, isPending ? null : data, DAYS_PROVINCE_STATE);
  const showFilter = !!data && data.length > 0;
  const showList = !isPending && !!filtered;

  return (
    <Screen>
      <SelectedLocationPanel title={country} onPress={onPress} />
      <ListTitle>Province / State</ListTitle>
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

export default ProvinceScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
